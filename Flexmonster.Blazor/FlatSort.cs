using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class FlatSort
    {
        [JsonPropertyName("sort")]
        public string Sort { get; set; }

        [JsonPropertyName("uniqueName")]
        public string UniqueName { get; set; }
    }
}