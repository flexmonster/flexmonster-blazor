using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

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

        //TODO:  drillObject 
        [JsonPropertyName("drills")]
        public object Drills { get; set; }

        //TODO:  expandObject 
        [JsonPropertyName("expands")]
        public object Expands { get; set; }

        //TODO:  sortingObject 
        [JsonPropertyName("sorting")]
        public object Sorting { get; set; }

        [JsonPropertyName("drillThrough")]
        public string[] DrillThrough { get; set; }

        [JsonPropertyName("flatOrder")]
        public string[] FlatOrder { get; set; }

        [JsonPropertyName("flatSort")]
        public string[] FlatSort { get; set; }
    }
}
