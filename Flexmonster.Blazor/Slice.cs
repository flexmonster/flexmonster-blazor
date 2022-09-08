using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class Slice
    {
        [JsonPropertyName("columns")]
        public SliceHierarchy[] Columns { get; set; }

        [JsonPropertyName("measures")]
        public SliceMeasure[] Measures { get; set; }

        [JsonPropertyName("reportFilters")]
        public SliceHierarchy[] ReportFilters { get; set; }

        [JsonPropertyName("rows")]
        public SliceHierarchy[] Rows { get; set; }

        [JsonPropertyName("drills")]
        public DrillObject Drills { get; set; }

        [JsonPropertyName("expands")]
        public ExpandObject Expands { get; set; }

        [JsonPropertyName("sorting")]
        public SortingObject Sorting { get; set; }

        [JsonPropertyName("drillThrough")]
        public string[] DrillThrough { get; set; }

        [JsonPropertyName("flatOrder")]
        public string[] FlatOrder { get; set; }

        [JsonPropertyName("flatSort")]
        public FlatSort[] FlatSort { get; set; }
    }
}