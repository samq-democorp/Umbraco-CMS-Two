using Umbraco.Cms.Core;
using Umbraco.Cms.Infrastructure.Persistence.Dtos;

namespace Umbraco.Cms.Infrastructure.Migrations.Upgrade.V_8_6_0;

[Obsolete("This is not used anymore and will be removed in Umbraco 13")]
public class AddMainDomLock : MigrationBase
{
    public AddMainDomLock(IMigrationContext context)
        : base(context)
    {
    }

    protected override void Migrate() => Database.Insert(Constants.DatabaseSchema.Tables.Lock, "id", false,
        new LockDto { Id = Constants.Locks.MainDom, Name = "MainDom" });
}
