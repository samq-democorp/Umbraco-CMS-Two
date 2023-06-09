// Copyright (c) Umbraco.
// See LICENSE for more details.

using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models;

namespace Umbraco.Cms.Core.Notifications;

/// <summary>
/// Called while content is moving, but before it has been moved. Cancel the operation to prevent the movement.
/// </summary>
public sealed class ContentMovingNotification : MovingNotification<IContent>
{
    public ContentMovingNotification(MoveEventInfo<IContent> target, EventMessages messages)
        : base(target, messages)
    {
    }

    public ContentMovingNotification(IEnumerable<MoveEventInfo<IContent>> target, EventMessages messages)
        : base(
        target,
        messages)
    {
    }
}
