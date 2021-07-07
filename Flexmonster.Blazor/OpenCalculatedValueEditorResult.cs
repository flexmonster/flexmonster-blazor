using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class OpenCalculatedValueEditorResult
    {
        [JsonPropertyName("uniqueName")]
        public string UniqueName { get; set; }

        [JsonPropertyName("isRemoved")]
        public bool IsRemoved { get; set; }
    }
}