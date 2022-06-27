using System.Collections.Generic;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Flexmonster.Blazor
{
    public class SaveParams
    {
        [JsonPropertyName("filename")]
        public string Filename { get; set; }

        [JsonPropertyName("destination")]
        public string Destination { get; set; }

        public delegate Task SaveHandler(SaveResult result, SaveError error);

        [JsonIgnore]
        public SaveHandler SaveCallback { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; }

        [JsonPropertyName("embedData")]
        public bool EmbedData { get; set; }

        [JsonPropertyName("reportType")]
        public string ReportType { get; set; }

        [JsonPropertyName("requestHeaders")]
        public Dictionary<string, string> RequestHeaders { get; set; }

        [JsonPropertyName("withDefaults")]
        public bool WithDefaults { get; set; }

        [JsonPropertyName("withGlobals")]
        public bool WithGlobals { get; set; }
    }
}