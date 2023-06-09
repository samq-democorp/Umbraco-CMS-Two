using Umbraco.Cms.Core;
using Umbraco.Cms.Infrastructure.Persistence.Dtos;

namespace Umbraco.Cms.Infrastructure.Migrations.Upgrade.V_8_9_0;

[Obsolete("This is not used anymore and will be removed in Umbraco 13")]
public class ExternalLoginTableUserData : MigrationBase
{
    public ExternalLoginTableUserData(IMigrationContext context)
        : base(context)
    {
    }

    /// <summary>
    ///     Adds new column to the External Login table
    /// </summary>
    protected override void Migrate() =>
        AddColumn<ExternalLoginDto>(Constants.DatabaseSchema.Tables.ExternalLogin, "userData");
}
