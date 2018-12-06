DROP PROCEDURE IF EXISTS [dbo].[CreateZipCodesRange]
GO
CREATE PROCEDURE [dbo].[CreateZipCodesRange](@StartWith INT, @EndWith INT, @MarginalCode INT)
AS
BEGIN
	DECLARE @TotalZipAdded INT = 0;
	
	DECLARE @zipsToAdd TABLE (
			ZipCode NVARCHAR(10),
			MetroMarginalCode INT);

	WHILE (@StartWith <= @EndWith)
	BEGIN
		IF NOT EXISTS(SELECT 1 FROM dbo.Zips WHERE ZipCode = @StartWith)
		BEGIN 
			INSERT INTO @zipsToAdd (ZipCode, MetroMarginalCode)
			VALUES (@StartWith, @MarginalCode);
			SET @TotalZipAdded = @TotalZipAdded + 1;		
		END 
		SET @StartWith = @StartWith + 1;		
	END

	INSERT INTO dbo.Zips (ZipCode, MetroMarginalCode)
	SELECT ZipCode, MetroMarginalCode
	FROM @zipsToAdd

	RETURN @TotalZipAdded
END
GO

