using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class SliceHierarchy
    {
        [JsonPropertyName("uniqueName")]
        public string UniqueName { get; set; }

        [JsonPropertyName("caption")]
        public string Caption { get; set; }

        [JsonPropertyName("dimensionName")]
        public string DimensionName { get; set; }

        [JsonPropertyName("filter")]
        public Filter Filter { get; set; }

        [JsonPropertyName("levelName")]
        public string LevelName { get; set; }

        //can be enum
        [JsonPropertyName("sort")]
        public string Sort { get; set; }

        [JsonPropertyName("sortOrder")]
        public string[] SortOrder { get; set; }

        [JsonPropertyName("showTotals")]
        public bool? ShowTotals { get; set; }
    }
}