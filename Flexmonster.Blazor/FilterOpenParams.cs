using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class FilterOpenParams
    {
        [JsonPropertyName("hierarchy")]
        public Hierarchy Hierarchy { get; set; }
    }
}