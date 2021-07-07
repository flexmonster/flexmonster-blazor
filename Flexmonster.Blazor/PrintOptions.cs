using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class PrintOptions
    {
        [JsonPropertyName("header")]
        public string Header { get; set; }

        [JsonPropertyName("footer")]
        public string Footer { get; set; }
    }
}