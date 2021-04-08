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
        public string[] tuple { get; set; }

        [JsonPropertyName("measure")]
        public MeasureObject measure { get; set; }
    }
}