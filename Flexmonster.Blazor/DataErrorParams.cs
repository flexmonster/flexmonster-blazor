using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class DataErrorParams
    {
        [JsonPropertyName("error")]
        public string Error { get; set; }
    }
}