using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class GridOptions
    {
        [JsonPropertyName("showFilter")]
        public bool? ShowFilter { get; set; }

        //can be enum
        [JsonPropertyName("showGrandTotals")]
        public string ShowGrandTotals { get; set; }

        [JsonPropertyName("showHeaders")]
        public bool? ShowHeaders { get; set; }

        [JsonPropertyName("showHierarchies")]
        public bool? ShowHierarchies { get; set; }

        [JsonPropertyName("showHierarchyCaptions")]
        public bool? ShowHierarchyCaptions { get; set; }

        [JsonPropertyName("showReportFiltersArea")]
        public bool? ShowReportFiltersArea { get; set; }

        [JsonPropertyName("showTotals")]
        public bool? ShowTotals { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("showAutoCalculationBar")]
        public bool? ShowAutoCalculationBar { get; set; }

        [JsonPropertyName("dragging")]
        public bool? Dragging { get; set; }

        [JsonPropertyName("grandTotalsPosition")]
        public string GrandTotalsPosition { get; set; }

        [JsonPropertyName("drillThroughMaxRows")]
        public string DraggdrillThroughMaxRowsing { get; set; }
    }
}