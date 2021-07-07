using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class ColumnSize
    {
        [JsonPropertyName("width")]
        public int? Width { get; set; }

        [JsonPropertyName("idx")]
        public int? Idx { get; set; }

        [JsonPropertyName("tuple")]
        public string[] Tuple { get; set; }

        [JsonPropertyName("measure")]
        public MeasureObject Measure { get; set; }
    }
}