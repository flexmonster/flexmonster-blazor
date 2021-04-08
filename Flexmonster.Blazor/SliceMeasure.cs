using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Flexmonster.Blazor
{
    public class SliceMeasure
    {
        [JsonPropertyName("uniqueName")]
        public string UniqueName { get; set; }

        [JsonPropertyName("active")]
        public bool? Active { get; set; }

        [JsonPropertyName("aggregation")]
        public string Aggregation { get; set; }

        [JsonPropertyName("availableAggregations")]
        public string[] AvailableAggregations { get; set; }

        [JsonPropertyName("caption")]
        public string Caption { get; set; }

        [JsonPropertyName("formula")]
        public string Formula { get; set; }

        [JsonPropertyName("individual")]
        public bool? Individual { get; set; }

        [JsonPropertyName("calculateNaN")]
        public bool? CalculateNaN { get; set; }

        [JsonPropertyName("format")]
        public string Format { get; set; }

        [JsonPropertyName("grandTotalCaption")]
        public string GrandTotalCaption { get; set; }
    }
}
