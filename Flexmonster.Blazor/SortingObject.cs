using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class SortingObject
    {

        [JsonPropertyName("column")]
        public SortingHierarchyObject Column { get; set; }

        [JsonPropertyName("row")]
        public SortingHierarchyObject Row { get; set; }
    }

    public class SortingHierarchyObject
    {
        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("tuple")]
        public string[] Tuple { get; set; }

        [JsonPropertyName("measure")]
        public Measure Measure { get; set; }
    }

}