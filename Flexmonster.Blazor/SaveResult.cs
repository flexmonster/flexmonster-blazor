using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class SaveResult
    {
        [JsonPropertyName("report")]
        public Report Report { get; set; }

        [JsonPropertyName("response")]
        public string Response { get; set; }

        [JsonPropertyName("status")]
        public bool Status { get; set; }
    }
}