using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class ChartData
    {
        [JsonPropertyName("chartType")]
        public string ChartType { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("element")]
        public object Element { get; set; }

        [JsonPropertyName("columns")]
        public Member[] Columns { get; set; }

        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("label")]
        public string Label { get; set; }

        [JsonPropertyName("measure")]
        public Measure Measure { get; set; }

        [JsonPropertyName("rows")]
        public Member[] Rows { get; set; }

        [JsonPropertyName("value")]
        public int? Value { get; set; }
    }
}