using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class ExportToResult
    {
        [JsonPropertyName("data")]
        public string Data { get; set; }

        [JsonPropertyName("filename")]
        public string Filename { get; set; }

        [JsonPropertyName("response")]
        public string Response { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }
    }
}