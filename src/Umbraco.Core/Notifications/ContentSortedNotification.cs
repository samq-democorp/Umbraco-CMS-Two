// Copyright (c) Umbraco.
// See LICENSE for more details.

using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models;

namespace Umbraco.Cms.Core.Notifications;

/// <summary>
/// Called after content has been sorted.
/// </summary>
public sealed class ContentSortedNotification : SortedNotification<IContent>
{
    public ContentSortedNotification(IEnumerable<IContent> target, EventMessages messages)
        : base(target, messages)
    {
    }
}
