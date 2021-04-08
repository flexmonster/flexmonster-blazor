using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class DataChangedParams
    {
        [JsonPropertyName("data")]
        public DataParams[] Data { get; set; }
    }

    public class DataParams
    {
        [JsonPropertyName("Id")]
        public string Id { get; set; }

        [JsonPropertyName("field")]
        public string Field { get; set; }

        [JsonPropertyName("value")]
        public string Value { get; set; }

        [JsonPropertyName("oldValue")]
        public string OldValue { get; set; }
    }

}