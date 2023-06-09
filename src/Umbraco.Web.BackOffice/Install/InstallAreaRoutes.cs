using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Hosting;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.Common.Routing;
using Umbraco.Extensions;

namespace Umbraco.Cms.Web.BackOffice.Install;

[Obsolete("Will be replaced with attribute routing in the new backoffice API")]
public class InstallAreaRoutes : IAreaRoutes
{
    private readonly IHostingEnvironment _hostingEnvironment;
    private readonly LinkGenerator _linkGenerator;
    private readonly IRuntimeState _runtime;

    public InstallAreaRoutes(IRuntimeState runtime, IHostingEnvironment hostingEnvironment, LinkGenerator linkGenerator)
    {
        _runtime = runtime;
        _hostingEnvironment = hostingEnvironment;
        _linkGenerator = linkGenerator;
    }

    public void CreateRoutes(IEndpointRouteBuilder endpoints)
    {
        var installPathSegment = _hostingEnvironment.ToAbsolute(Constants.SystemDirectories.Install).TrimStart('/');

        switch (_runtime.Level)
        {
            case RuntimeLevel.Install:
            case RuntimeLevel.Upgrade:
            case RuntimeLevel.Run:

                endpoints.MapUmbracoRoute<InstallApiController>(installPathSegment, Constants.Web.Mvc.InstallArea, "api", includeControllerNameInRoute: false);
                endpoints.MapUmbracoRoute<InstallController>(installPathSegment, Constants.Web.Mvc.InstallArea, string.Empty, includeControllerNameInRoute: false);
                break;
            case RuntimeLevel.BootFailed:
            case RuntimeLevel.Unknown:
            case RuntimeLevel.Boot:
                break;
        }
    }
}
