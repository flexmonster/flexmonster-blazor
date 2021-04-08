using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class Hierarchy
    {
        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("caption ")]
        public string Caption { get; set; }

        [JsonPropertyName("dimensionCaption")]
        public string DimensionCaption { get; set; }

        [JsonPropertyName("dimensionUniqueName")]
        public string DimensionUniqueName { get; set; }

        [JsonPropertyName("folder")]
        public string Folder { get; set; }

        [JsonPropertyName("label")]
        public string uniqueName { get; set; }

        //TODO: Level object
        [JsonPropertyName("levels")]
        public object[] Levels { get; set; }

        [JsonPropertyName("sort")]
        public string Sort { get; set; }

        [JsonPropertyName("uniqueName")]
        public string Label { get; set; }

    }
}