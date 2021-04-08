using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class MeasureObject
    {
        [JsonPropertyName("uniqueName")]
        public string UniqueName { get; set; }

        [JsonPropertyName("aggregation")]
        public string Aggregation { get; set; }
    }
}