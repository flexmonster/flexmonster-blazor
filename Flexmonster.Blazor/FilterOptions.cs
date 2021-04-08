using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class FilterOptions
    {
        [JsonPropertyName("timezoneOffset")]
        public int? TimezoneOffset { get; set; }

        [JsonPropertyName("weekOffset")]
        public int? WeekOffset { get; set; }

        [JsonPropertyName("dateFormat")]
        public string DateFormat { get; set; }

        [JsonPropertyName("liveSearch")]
        public bool? LiveSearch { get; set; }
    }
}