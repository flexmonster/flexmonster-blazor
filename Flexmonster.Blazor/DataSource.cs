using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class DataSource
    {
        //TODO: add credentials object
        [JsonPropertyName("browseForFile")]
        public bool? BrowseForFile { get; set; }

        [JsonPropertyName("catalog")]
        public string Catalog { get; set; }

        [JsonPropertyName("cube")]
        public string Cube { get; set; }

        [JsonPropertyName("data")]
        public object[] Data { get; set; }

        [JsonPropertyName("dataSourceInfo")]
        public string DataSourceInfo { get; set; }

        [JsonPropertyName("dataSourceType")]
        public string DataSourceType { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("fieldSeparator")]
        public string FieldSeparator { get; set; }

        [JsonPropertyName("thousandSeparator")]
        public string ThousandSeparator { get; set; }

        [JsonPropertyName("filename")]
        public string Filename { get; set; }

        [JsonPropertyName("ignoreQuotedLineBreaks")]
        public bool? IgnoreQuotedLineBreaks { get; set; }

        [JsonPropertyName("proxyUrl")]
        public string ProxyUrl { get; set; }

        [JsonPropertyName("recordsetDelimiter")]
        public string RecordsetDelimiter { get; set; }

        [JsonPropertyName("binary")]
        public bool? Binary { get; set; }

        [JsonPropertyName("roles")]
        public string Roles { get; set; }

        [JsonPropertyName("localeIdentifier")]
        public string LocaleIdentifier { get; set; }

        [JsonPropertyName("effectiveUserName")]
        public string EffectiveUserName { get; set; }

        [JsonPropertyName("customData")]
        public string CustomData { get; set; }

        [JsonPropertyName("hash")]
        public string Hash { get; set; }

        //only string
        [JsonPropertyName("url")]
        public object Url { get; set; }

        //in object you can pass string, should i make model for elastic object?
        [JsonPropertyName("subquery")]
        public object Subquery { get; set; }

        //can make as object, but dictionary is more useful
        [JsonPropertyName("requestHeaders")]
        public Dictionary<string, string> RequestHeaders { get; set; }
        //not sure no info in docs, but again object is everything
        [JsonPropertyName("host")]
        public object Host { get; set; }

        [JsonPropertyName("node")]
        public string Node { get; set; }

        [JsonPropertyName("index")]
        public string Index { get; set; }

        [JsonPropertyName("useStreamLoader")]
        public bool? UseStreamLoader { get; set; }

        //i created model, so only object
        [JsonPropertyName("mapping")]
        public Mapping Mapping { get; set; }

        [JsonPropertyName("withCredentials")]
        public bool? WithCredentials { get; set; }

        [JsonPropertyName("singleEndpoint")]
        public bool? SingleEndpoint { get; set; }
    }
}
