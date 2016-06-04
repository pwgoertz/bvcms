using System.Collections.Generic;
using System.Linq;
using CmsData;
using CmsData.Codes;
using UtilityExtensions;
using System.Text.RegularExpressions;
using CmsData.View;

namespace CmsWeb.Models
{
    public class OrgMembersModel2 : OrgMembersModel
    {
        public new IEnumerable<MemberInfo> Members()
        {
            var q = ApplySort();
            var q2 = from op in q
                     select new MemberInfo
                     {
                         PeopleId = op.PeopleId ?? 0,
                         Age = op.Age,
                         DOB = Util.FormatBirthday(op.BirthYear, op.BirthMonth, op.BirthDay),
                         Gender = op.Gender,
                         Grade = op.Grade,
                         OrgId = op.OrganizationId ?? 0,
                         Request = op.Request,
                         Name = op.Name,
                         isChecked = op.OrganizationId == TargetId,
                         MemberStatus = op.MemberType,
                         OrgName = op.OrganizationName
                     };
            return q2;
        }

        public int Count2()
        {
            return GetMembers().Count();
        }
        private IQueryable<OrgMembersGroupFiltered> members2;
        private IQueryable<OrgMembersGroupFiltered> GetMembers()
        {
            if (members2 != null)
                return members2;

            var glist = new int[] {};
            if (Grades.HasValue())
                glist = (from g in (Grades ?? "").Split(new char[] {',', ';'})
                         select g.ToInt()).ToArray();

            var oids = string.Join(",",
                from o in DbUtil.Db.Organizations
                where o.DivOrgs.Any(di => di.DivId == SourceDivId)
                where SourceId == 0 || o.OrganizationId == SourceId
                select o.OrganizationId);

            var q = from op in DbUtil.Db.OrgMembersGroupFiltered(oids, SmallGroup)
                    where glist.Length == 0 || glist.Contains(op.Grade.Value)
                    where !MembersOnly || op.MemberTypeId == MemberTypeCode.Member
                    select op;

            if (null != Age && Age.Trim().Length > 0)
            {
                var str = Regex.Replace(Age, @"[^0-9\-<>=]", "");
                if ((new Regex(@"^[0-9]+$")).IsMatch(str))
                {
                    q = from op in q
                        where op.Age == str.ToInt()
                        select op;
                }
                else if ((new Regex(@"^[0-9]+\-[0-9]+$")).IsMatch(str))
                {
                    var matches = Regex.Matches(str, @"^([0-9]+)\-([0-9]+)$");
                    q = from op in q
                        where op.Age >= matches[0].Groups[1].Value.ToInt()
                        where op.Age <= matches[0].Groups[2].Value.ToInt()
                        select op;
                }
                else if ((new Regex(@"^>=[0-9]+$")).IsMatch(str))
                {
                    var matches = Regex.Matches(str, @"^>=([0-9]+)$");
                    q = from op in q
                        where op.Age >= matches[0].Groups[1].Value.ToInt()
                        select op;
                }
                else if ((new Regex(@"^>[0-9]+$")).IsMatch(str))
                {
                    var matches = Regex.Matches(str, @"^>([0-9]+)$");
                    q = from op in q
                        where op.Age > matches[0].Groups[1].Value.ToInt()
                        select op;
                }
                else if ((new Regex(@"^<=[0-9]+$")).IsMatch(str))
                {
                    var matches = Regex.Matches(str, @"^<=([0-9]+)$");
                    q = from op in q
                        where op.Age <= matches[0].Groups[1].Value.ToInt()
                        select op;
                }
                else if ((new Regex(@"^<[0-9]+$")).IsMatch(str))
                {
                    var matches = Regex.Matches(str, @"^<([0-9]+)$");
                    q = from op in q
                        where op.Age < matches[0].Groups[1].Value.ToInt()
                        select op;
                }
            }
            return members2 = q;
        }
        public new IEnumerable<OrgMembersGroupFiltered> ApplySort()
        {
            var q = GetMembers();

            if (Dir == "asc")
                switch (Sort)
                {
                    default:
                    case "Name":
                        q = from op in q
                            orderby op.Name2
                            select op;
                        break;
                    case "Date of Birth":
                        q = from op in q
                            orderby op.BirthYear, op.BirthMonth, op.BirthDay
                            select op;
                        break;
                    case "Organization":
                        q = from op in q
                            orderby op.OrganizationName, op.Name2
                            select op;
                        break;
                    case "Grade":
                        q = from op in q
                            orderby op.Grade, op.OrganizationName, op.Name2
                            select op;
                        break;
                    case "Gender":
                        q = from op in q
                            orderby op.Gender, op.OrganizationName, op.Name2
                            select op;
                        break;
                    case "Mixed":
                        q = from op in q
                            orderby op.HashNum
                            select op;
                        break;
                }
            else
                switch (Sort)
                {
                    default:
                    case "Name":
                        q = from op in q
                            orderby op.Name2 descending
                            select op;
                        break;
                    case "Date of Birth":
                        q = from op in q
                            orderby op.BirthYear descending, op.BirthMonth descending, op.BirthDay descending
                            select op;
                        break;
                    case "Organization":
                        q = from op in q
                            orderby op.OrganizationName descending, op.Name2
                            select op;
                        break;
                    case "Grade":
                        q = from op in q
                            orderby op.Grade descending, op.OrganizationName, op.Name2
                            select op;
                        break;
                    case "Gender":
                        q = from op in q
                            orderby op.Gender descending, op.OrganizationName, op.Name2
                            select op;
                        break;
                    case "Mixed":
                        q = from op in q
                            orderby op.HashNum
                            select op;
                        break;
                }
            return q;
        }
    }
}