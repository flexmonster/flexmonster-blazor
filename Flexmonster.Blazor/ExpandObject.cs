using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class ExpandObject
    {
        [JsonPropertyName("expandAll")]
        public bool? ExpandAll { get; set; }

        [JsonPropertyName("columns")]
        public HierarchyObjectInSlice[] Columns { get; set; }

        [JsonPropertyName("rows")]
        public HierarchyObjectInSlice[] Rows { get; set; }
    }

}