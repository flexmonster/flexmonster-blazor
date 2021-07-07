using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class UpdateDataParams
    {
        [JsonPropertyName("partial")]
        public bool? Partial { get; set; }

        [JsonPropertyName("ignoreSorting")]
        public bool? IgnoreSorting { get; set; }

        [JsonPropertyName("ignoreScroll")]
        public bool? IgnoreScroll { get; set; }
    }
}