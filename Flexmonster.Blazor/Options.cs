using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class Options
    {
        [JsonPropertyName("chart")]
        public ChartOptions Chart { get; set; }

        [JsonPropertyName("grid")]
        public GridOptions Grid { get; set; }

        [JsonPropertyName("filter")]
        public FilterOptions Filter { get; set; }

        [JsonPropertyName("allowBrowsersCache")]
        public bool? AllowBrowsersCache { get; set; }

        [JsonPropertyName("configuratorActive")]
        public bool? ConfiguratorActive { get; set; }

        [JsonPropertyName("configuratorButton")]
        public bool? ConfiguratorButton { get; set; }

        [JsonPropertyName("dateTimezoneOffset")]
        public int? DateTimezoneOffset { get; set; }

        [JsonPropertyName("datePattern")]
        public string DatePattern { get; set; }

        [JsonPropertyName("dateTimePattern")]
        public string DateTimePattern { get; set; }

        [JsonPropertyName("defaultHierarchySortName")]
        public string DefaultHierarchySortName { get; set; }

        [JsonPropertyName("drillThrough")]
        public bool? DrillThrough { get; set; }

        [JsonPropertyName("editing")]
        public bool? Editing { get; set; }

        [JsonPropertyName("showAggregations")]
        public bool? ShowAggregations { get; set; }

        [JsonPropertyName("showCalculatedValuesButton")]
        public bool? ShowCalculatedValuesButton { get; set; }

        [JsonPropertyName("showDefaultSlice")]
        public bool? ShowDefaultSlice { get; set; }

        [JsonPropertyName("showMemberProperties")]
        public bool? ShowMemberProperties { get; set; }

        [JsonPropertyName("sorting")]
        public bool? Sorting { get; set; }

        [JsonPropertyName("viewType")]
        public string ViewType { get; set; }

        [JsonPropertyName("showAggregationLabels")]
        public bool? ShowAggregationLabels { get; set; }

        [JsonPropertyName("useOlapFormatting")]
        public bool? UseOlapFormatting { get; set; }

        [JsonPropertyName("defaultDateType")]
        public string DefaultDateType { get; set; }

        [JsonPropertyName("timePattern")]
        public string TimePattern { get; set; }

        [JsonPropertyName("showOutdatedDataAlert")]
        public bool? ShowOutdatedDataAlert { get; set; }

        [JsonPropertyName("showEmptyData")]
        public bool? ShowEmptyData { get; set; }

        [JsonPropertyName("saveAllFormats")]
        public bool? SaveAllFormats { get; set; }

        [JsonPropertyName("showDrillThroughConfigurator")]
        public bool? ShowDrillThroughConfigurator { get; set; }

        [JsonPropertyName("grouping")]
        public bool? Grouping { get; set; }

        [JsonPropertyName("showAllFieldsDrillThrough")]
        public bool? ShowAllFieldsDrillThrough { get; set; }

        [JsonPropertyName("validateFormulas")]
        public bool? ValidateFormulas { get; set; }

        [JsonPropertyName("showFieldListSearch")]
        public bool? ShowFieldListSearch { get; set; }

        [JsonPropertyName("strictDataTypes")]
        public bool? StrictDataTypes { get; set; }

        [JsonPropertyName("caseSensitiveMembers")]
        public bool? CaseSensitiveMembers { get; set; }

        [JsonPropertyName("simplifyFieldListFolders")]
        public bool? SimplifyFieldListFolders { get; set; }

        [JsonPropertyName("validateReportFiles")]
        public bool? ValidateReportFiles { get; set; }

        [JsonPropertyName("fieldListPosition")]
        public string FieldListPosition { get; set; }

        [JsonPropertyName("showEmptyValues")]
        public string ShowEmptyValues { get; set; }

        [JsonPropertyName("useCaptionsInCalculatedValueEditor")]
        public bool? UseCaptionsInCalculatedValueEditor { get; set; }

        [JsonPropertyName("expandExecutionTimeout")]
        public int? ExpandExecutionTimeout { get; set; }

        [JsonPropertyName("readOnly")]
        public bool? ReadOnly { get; set; }

        [JsonPropertyName("distinguishNullUndefinedEmpty ")]
        public bool? DistinguishNullUndefinedEmpty { get; set; }
    }
}