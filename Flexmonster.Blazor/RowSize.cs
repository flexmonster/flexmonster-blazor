using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class RowSize
    {
        [JsonPropertyName("height")]
        public int? Height { get; set; }

        [JsonPropertyName("idx")]
        public int? Idx { get; set; }

        [JsonPropertyName("tuple")]
        public string[] tuple { get; set; }

        [JsonPropertyName("measure")]
        public MeasureObject measure { get; set; }
    }
}