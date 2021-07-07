using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class Measure
    {
        [JsonPropertyName("active")]
        public bool? Active { get; set; }

        [JsonPropertyName("aggregation")]
        public string Aggregation { get; set; }

        [JsonPropertyName("availableAggregations")]
        public string[] AvailableAggregations { get; set; }

        [JsonPropertyName("availableAggregationsCaptions")]
        public string[] AvailableAggregationsCaptions { get; set; }

        [JsonPropertyName("caption")]
        public string Caption { get; set; }

        [JsonPropertyName("calculated")]
        public bool? Calculated { get; set; }

        [JsonPropertyName("calculateNaN")]
        public bool? CalculateNaN { get; set; }

        [JsonPropertyName("folder")]
        public string Folder { get; set; }

        [JsonPropertyName("formula")]
        public string Formula { get; set; }

        [JsonPropertyName("format")]
        public string Format { get; set; }

        [JsonPropertyName("grandTotalCaption")]
        public string GrandTotalCaption { get; set; }

        [JsonPropertyName("individual")]
        public bool? Individual { get; set; }

        [JsonPropertyName("label")]
        public string Label { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("uniqueName")]
        public string UniqueName { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }
    }
}