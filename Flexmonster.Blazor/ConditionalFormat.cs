using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class ConditionalFormat
    {
        [JsonPropertyName("formula")]
        public string Formula { get; set; }

        [JsonPropertyName("format")]
        public Style Format { get; set; }

        [JsonPropertyName("formatCSS")]
        public string FormatCSS { get; set; }

        [JsonPropertyName("row")]
        public int? Row { get; set; }

        [JsonPropertyName("column")]
        public int? Column { get; set; }

        [JsonPropertyName("aggregation")]
        public string Aggregation { get; set; }

        [JsonPropertyName("measure")]
        public string Measure { get; set; }

        [JsonPropertyName("hierarchy")]
        public string Hierarchy { get; set; }

        [JsonPropertyName("member")]
        public string Member { get; set; }

        [JsonPropertyName("isTotal")]
        public bool? IsTotal { get; set; }

        [JsonPropertyName("id")]
        public string Id { get; set; }
    }
}