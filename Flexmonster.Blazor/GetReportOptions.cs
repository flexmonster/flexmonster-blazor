using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class GetReportOptions
    {
        [JsonPropertyName("withGlobals")]
        public bool? WithGlobals { get; set; }

        [JsonPropertyName("withDefaults")]
        public bool? WithDefaults { get; set; }
    }
}