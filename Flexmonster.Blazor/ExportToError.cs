using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class ExportToError
    {
        [JsonPropertyName("message")]
        public string Message { get; set; }

        [JsonPropertyName("response")]
        public string Response { get; set; }

        [JsonPropertyName("status")]
        public int Status { get; set; }
    }
}