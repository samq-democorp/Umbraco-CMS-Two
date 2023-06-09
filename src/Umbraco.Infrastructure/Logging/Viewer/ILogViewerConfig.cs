namespace Umbraco.Cms.Core.Logging.Viewer;

public interface ILogViewerConfig
{
    IReadOnlyList<SavedLogSearch> GetSavedSearches();

    IReadOnlyList<SavedLogSearch> AddSavedSearch(string name, string query);

    [Obsolete("Use the overload that only takes a 'name' parameter instead. This will be removed in Umbraco 14.")]
    IReadOnlyList<SavedLogSearch> DeleteSavedSearch(string name, string query);

    IReadOnlyList<SavedLogSearch> DeleteSavedSearch(string name) => DeleteSavedSearch(name, string.Empty);
}
