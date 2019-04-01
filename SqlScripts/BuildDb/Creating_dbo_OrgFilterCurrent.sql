
CREATE FUNCTION [dbo].[OrgFilterCurrent](@oid INT)
RETURNS TABLE
RETURN
(
	SELECT om.PeopleId
	, 'Members' Tab
	, '10' GroupCode
	, om.AttendPct AttPct
	, a.MeetingDate LastAttended
	, om.EnrollmentDate Joined
	, CAST(NULL AS DATETIME) AS Dropped
	, om.InactiveDate
	, mt.Code MemberCode
	, mt.Description MemberType
	, ISNULL(om.Hidden, 0) Hidden
	, (SELECT STUFF((
			SELECT CHAR(10) + mt.Name 
			FROM dbo.OrgMemMemTags omt 
			JOIN dbo.MemberTags mt ON mt.Id = omt.MemberTagId 
			WHERE omt.OrgId = om.OrganizationId AND omt.PeopleId = om.PeopleId
			FOR XML PATH(''),TYPE
			).value('text()[1]','nvarchar(max)'),1,1,N''
	  )) Groups

	FROM dbo.OrganizationMembers om
	LEFT JOIN dbo.Attend a ON a.OrganizationId = om.OrganizationId 
			AND a.PeopleId = om.PeopleId AND a.AttendanceFlag = 1
			AND a.MeetingDate = (SELECT MAX(la.MeetingDate)
					FROM dbo.Attend la
					WHERE la.OrganizationId = @oid
					AND la.PeopleId = a.PeopleId
						AND la.AttendanceFlag = 1)
	LEFT JOIN lookup.MemberType mt ON mt.Id = om.MemberTypeId
	WHERE om.OrganizationId = @oid
	AND ISNULL(om.pending, 0) = 0
	AND om.MemberTypeId NOT IN (230, 311) -- not inactive, prospect
)

GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
