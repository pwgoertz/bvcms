﻿using CmsData;
using CmsData.Codes;
using CmsWeb.Code;
using CmsWeb.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web.Security;

namespace CmsWeb.Areas.People.Models
{
    public class ContributionsModel : PagedTableModel<Contribution, ContributionInfo>
    {
        public int PeopleId
        {
            get { return peopleid; }
            set
            {
                peopleid = value;
                Person = CurrentDatabase.LoadPersonById(peopleid);
                ContributionOptions = new CodeInfo(Person.ContributionOptionsId, "ContributionOptions");
                EnvelopeOptions = new CodeInfo(Person.EnvelopeOptionsId, "EnvelopeOptions");
                ElectronicStatement = Person.ElectronicStatement ?? false;
            }
        }
        private int peopleid;
        public Person Person;

        public bool ShowNames;
        public bool ShowTypes;
        [DisplayName("Electronic Only"), TrackChanges]
        public bool ElectronicStatement { get; set; }
        [DisplayName("Statement Option")]
        public CodeInfo ContributionOptions { get; set; }
        [DisplayName("Envelope Option")]
        public CodeInfo EnvelopeOptions { get; set; }

        public ContributionsModel()
            : base("Date", "desc", true)
        { }

        public override IQueryable<Contribution> DefineModelList()
        {
            IQueryable<Contribution> contributionRecords;

            var currentUser = CurrentDatabase.CurrentUserPerson;
            var isFinanceUser = Roles.GetRolesForUser().Contains("Finance");
            var isCurrentUser = currentUser.PeopleId == Person.PeopleId;
            var isSpouse = currentUser.PeopleId == Person.SpouseId;
            var isFamilyMember = currentUser.FamilyId == Person.FamilyId;

            if (isCurrentUser || (isSpouse && (Person.ContributionOptionsId ?? StatementOptionCode.Joint) == StatementOptionCode.Joint) || isFamilyMember || isFinanceUser)
            {
                contributionRecords = from c in CurrentDatabase.Contributions
                                      where (c.PeopleId == Person.PeopleId || (c.PeopleId == Person.SpouseId && (Person.ContributionOptionsId ?? StatementOptionCode.Joint) == StatementOptionCode.Joint))
                                      && c.ContributionStatusId == ContributionStatusCode.Recorded
                                      && !ContributionTypeCode.ReturnedReversedTypes.Contains(c.ContributionTypeId)
                                      select c;
            }
            else
            {
                contributionRecords = from c in CurrentDatabase.Contributions
                                      join f in CurrentDatabase.ContributionFunds.ScopedByRoleMembership() on c.FundId equals f.FundId
                                      where c.PeopleId == Person.PeopleId
                                      && c.ContributionStatusId == ContributionStatusCode.Recorded
                                      && !ContributionTypeCode.ReturnedReversedTypes.Contains(c.ContributionTypeId)
                                      select c;
            }

            var items = contributionRecords.ToList();

            ShowNames = items.Any(c => c.PeopleId != Person.PeopleId);
            ShowTypes = items.Any(c => ContributionTypeCode.SpecialTypes.Contains(c.ContributionTypeId));

            return contributionRecords;
        }

        public override IQueryable<Contribution> DefineModelSort(IQueryable<Contribution> q)
        {
            switch (SortExpression)
            {
                case "Name":
                    return from c in q
                           orderby c.Person.Name2, c.ContributionDate
                           select c;
                case "Name desc":
                    return from c in q
                           orderby c.Person.Name2 descending, c.ContributionDate
                           select c;
                case "Type":
                    return from c in q
                           let online = c.BundleDetails.Single().BundleHeader.BundleHeaderTypeId == BundleTypeCode.Online
                           orderby c.ContributionType.Description, online, c.ContributionDate
                           select c;
                case "Type desc":
                    return from c in q
                           let online = c.BundleDetails.Single().BundleHeader.BundleHeaderTypeId == BundleTypeCode.Online
                           orderby c.ContributionType.Description descending, online descending, c.ContributionDate
                           select c;
                case "Fund":
                    return from c in q
                           orderby c.ContributionFund.FundDescription, c.ContributionDate
                           select c;
                case "Fund desc":
                    return from c in q
                           orderby c.ContributionFund.FundDescription descending, c.ContributionDate
                           select c;
                case "Amount":
                    return from c in q
                           orderby c.ContributionAmount, c.ContributionDate
                           select c;
                case "Amount desc":
                    return from c in q
                           orderby c.ContributionAmount descending, c.ContributionDate
                           select c;
                case "CheckNo":
                    return from c in q
                           orderby c.CheckNo, c.ContributionDate
                           select c;
                case "CheckNo desc":
                    return from c in q
                           orderby c.CheckNo descending, c.ContributionDate
                           select c;
                case "Date":
                    return q.OrderBy(c => c.ContributionDate);
                case "Date desc":
                default:
                    return q.OrderByDescending(c => c.ContributionDate);
            }
        }

        public override IEnumerable<ContributionInfo> DefineViewList(IQueryable<Contribution> q)
        {
            var q2 = from c in q
                     let online = c.BundleDetails.Single().BundleHeader.BundleHeaderType.Description.Contains("Online")
                     select new ContributionInfo()
                     {
                         Amount = c.ContributionAmount ?? 0,
                         CheckNo = c.CheckNo,
                         ImageId = c.ImageID,
                         ContributionId = c.ContributionId,
                         Date = c.ContributionDate.Value,
                         Fund = c.ContributionFund.FundDescription,
                         Name = c.Person.PeopleId == PeopleId ? c.Person.PreferredName : c.Person.Name,
                         Type = ContributionTypeCode.SpecialTypes.Contains(c.ContributionTypeId)
                              ? c.ContributionType.Description
                              : !online
                                  ? c.ContributionType.Description
                                  : c.ContributionDesc == "Recurring Giving"
                                      ? c.ContributionDesc
                                      : "Online",
                     };
            return q2;
        }

        public static IEnumerable<StatementInfo> Statements(int? id)
        {
            if (!id.HasValue)
            {
                throw new ArgumentException("Missing id");
            }

            var person = CurrentDatabase.LoadPersonById(id.Value);


            var contributions = (from c in CurrentDatabase.Contributions2(new DateTime(1900, 1, 1), new DateTime(3000, 12, 31), 0, false, null, true)
                                where (c.PeopleId == person.PeopleId || (c.PeopleId == person.SpouseId && (person.ContributionOptionsId ?? StatementOptionCode.Joint) == StatementOptionCode.Joint))
                                select c).ToList();

            var currentUser = CurrentDatabase.CurrentUserPerson;

            if (currentUser.PeopleId != person.PeopleId)
            {
                var authorizedFunds = CurrentDatabase.ContributionFunds.ScopedByRoleMembership();
                var authorizedContributions = from c in contributions
                                              join f in authorizedFunds on c.FundId equals f.FundId
                                              select c;

                contributions = authorizedContributions.ToList();
            }


            var result = from c in contributions
                   group c by c.DateX.Value.Year into g
                   orderby g.Key descending
                   select new StatementInfo()
                   {
                       Count = g.Count(),
                       Amount = g.Sum(cc => cc.Amount ?? 0),
                       StartDate = new DateTime(g.Key, 1, 1),
                       EndDate = new DateTime(g.Key, 12, 31)
                   };

            return result;
        }
    }
}
