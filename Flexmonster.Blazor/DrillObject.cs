using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class DrillObject
    {
        [JsonPropertyName("drillAll")]
        public bool? DrillAll { get; set; }

        [JsonPropertyName("drillAllRows")]
        public bool? DrillAllRows { get; set; }

        [JsonPropertyName("drillAllColumns")]
        public bool? DrillAllColumns { get; set; }

        [JsonPropertyName("columns")]
        public HierarchyObjectInSlice[] Columns { get; set; }

        [JsonPropertyName("rows")]
        public HierarchyObjectInSlice[] Rows { get; set; }
    }

    public class HierarchyObjectInSlice
    {
        [JsonPropertyName("tuple")]
        public string[] Tuple { get; set; }

        [JsonPropertyName("measure")]
        public Measure Measure { get; set; }
    }

}