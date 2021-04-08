using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class Mapping
    {
        [JsonPropertyName("caption")]
        public string Caption { get; set; }

        //can be enum
        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("hierarchy")]
        public string Hierarchy { get; set; }

        [JsonPropertyName("parent")]
        public string Parent { get; set; }

        [JsonPropertyName("folder")]
        public string Folder { get; set; }

        //can be enum(?)
        [JsonPropertyName("aggregations")]
        public string[] Aggregations { get; set; }

        [JsonPropertyName("filters")]
        public bool? Filters { get; set; }

        [JsonPropertyName("visible")]
        public bool? Visible { get; set; }

        [JsonPropertyName("interval")]
        public string Interval { get; set; }

        [JsonPropertyName("time_zone")]
        public string TimeZone { get; set; }

        [JsonPropertyName("format")]
        public string Format { get; set; }

        [JsonPropertyName("min_doc_count ")]
        public int? MinDocCount { get; set; }
    }
}