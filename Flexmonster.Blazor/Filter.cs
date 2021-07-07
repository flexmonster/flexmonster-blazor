using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class Filter
    {
        [JsonPropertyName("members")]
        public string[] Members { get; set; }

        [JsonPropertyName("exclude")]
        public string[] Exclude { get; set; }

        [JsonPropertyName("include")]
        public string[] Include { get; set; }

        [JsonPropertyName("query")]
        public QueryObject Query { get; set; }

        [JsonPropertyName("measure")]
        public MeasureObject Measure { get; set; }
    }
}