using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class Style
    {
        [JsonPropertyName("color")]
        public string Color { get; set; }

        [JsonPropertyName("backgroundColor")]
        public string BackgroundColor { get; set; }

        [JsonPropertyName("backgroundImage")]
        public string BackgroundImage { get; set; }

        [JsonPropertyName("borderColor")]
        public string BorderColor { get; set; }

        [JsonPropertyName("fontSize")]
        public string FontSize { get; set; }

        [JsonPropertyName("fontWeight")]
        public string FontWeight { get; set; }

        [JsonPropertyName("fill")]
        public string Fill { get; set; }

        [JsonPropertyName("textAlign")]
        public string TextAlign { get; set; }

        [JsonPropertyName("fontFamily")]
        public string FontFamily { get; set; }

        [JsonPropertyName("width")]
        public int? Width { get; set; }

        [JsonPropertyName("maxWidth")]
        public int? MaxWidth { get; set; }

        [JsonPropertyName("height")]
        public int? Height { get; set; }

        [JsonPropertyName("maxHeight")]
        public int? MaxHeight { get; set; }
    }
}