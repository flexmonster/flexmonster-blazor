using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class AccessibilityOptions
    {
        [JsonPropertyName("keyboardMode")]
        public bool? KeyboardMode { get; set; }

        [JsonPropertyName("highContrastTheme")]
        public string HighContrastTheme { get; set; }
    }
}