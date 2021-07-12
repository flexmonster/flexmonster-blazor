using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class APIClientOptions
    {
        [JsonPropertyName("url")]
        public string Url { get; set; }

        [JsonPropertyName("singleEndpoint")]
        public bool? SingleEndpoint { get; set; }

        [JsonPropertyName("requestHeaders")]
        public Dictionary<string, string> RequestHeaders { get; set; }

        [JsonPropertyName("withCredentials")]
        public bool? WithCredentials { get; set; }

    }
}