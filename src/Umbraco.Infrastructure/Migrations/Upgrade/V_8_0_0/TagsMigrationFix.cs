using Umbraco.Cms.Core;

namespace Umbraco.Cms.Infrastructure.Migrations.Upgrade.V_8_0_0;

[Obsolete("This is not used anymore and will be removed in Umbraco 13")]
public class TagsMigrationFix : MigrationBase
{
    public TagsMigrationFix(IMigrationContext context)
        : base(context)
    {
    }

    protected override void Migrate()
    {
        // kill unused parentId column, if it still exists
        if (ColumnExists(Constants.DatabaseSchema.Tables.Tag, "ParentId"))
        {
            Delete.Column("ParentId").FromTable(Constants.DatabaseSchema.Tables.Tag).Do();
        }
    }
}
