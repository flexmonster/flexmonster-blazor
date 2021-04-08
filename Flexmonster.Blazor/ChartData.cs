using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class ChartData
    {
        [JsonPropertyName("chartType")]
        public string ChartType { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        // HTML DOM element of the segment
        [JsonPropertyName("element")]
        public object Element { get; set; }

        //TODO: Member object
        [JsonPropertyName("columns")]
        public object[] Columns { get; set; }

        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("label")]
        public string Label { get; set; }

        //TODO: measure object(NOT MeasureObject)
        [JsonPropertyName("measure")]
        public object Measure { get; set; }

        //TODO: member object
        [JsonPropertyName("rows")]
        public object[] Rows { get; set; }

        [JsonPropertyName("value")]
        public int? Value { get; set; }
    }
}