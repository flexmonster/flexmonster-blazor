using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    //unified class for number/label/date/time/value query
    public class QueryObject
    {
        [JsonPropertyName("equal")]
        public string Equal { get; set; }

        [JsonPropertyName("not_equal")]
        public string NotEqual { get; set; }

        [JsonPropertyName("begin")]
        public string Begin { get; set; }

        [JsonPropertyName("not_begin")]
        public string NotBegin { get; set; }

        [JsonPropertyName("end")]
        public string End { get; set; }

        [JsonPropertyName("not_end")]
        public string NotEnd { get; set; }

        [JsonPropertyName("contain")]
        public string Contain { get; set; }

        [JsonPropertyName("not_contain")]
        public string NotContain { get; set; }

        [JsonPropertyName("greater")]
        public string Greater { get; set; }

        [JsonPropertyName("greater_equal")]
        public string GreaterEqual { get; set; }

        [JsonPropertyName("less")]
        public string Less { get; set; }

        [JsonPropertyName("less_equal")]
        public string LessEqual { get; set; }

        [JsonPropertyName("between")]
        public string[] Between { get; set; }

        [JsonPropertyName("not_between")]
        public string[] NotBetween { get; set; }

        [JsonPropertyName("top")]
        public int? Top { get; set; }

        [JsonPropertyName("bottom")]
        public int? Bottom { get; set; }

        [JsonPropertyName("last")]
        public string Last { get; set; }

        [JsonPropertyName("current")]
        public string Current { get; set; }

        [JsonPropertyName("next")]
        public string Next { get; set; }
    }
}