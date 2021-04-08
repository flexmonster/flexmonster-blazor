using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class GridDrawParams
    {
        [JsonPropertyName("smooth")]
        public bool Smooth { get; set; }
    }
}