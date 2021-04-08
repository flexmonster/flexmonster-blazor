using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class Report
    {
        [JsonPropertyName("dataSource")]
        public DataSource DataSource { get; set; }

        [JsonPropertyName("slice")]
        public Slice Slice { get; set; }

        [JsonPropertyName("options")]
        public Options Options { get; set; }

        [JsonPropertyName("conditions")]
        public ConditionalFormat[] Conditions { get; set; }

        [JsonPropertyName("formats")]
        public Format[] Formats { get; set; }

        [JsonPropertyName("tableSizes")]
        public TableSizes TableSizes { get; set; }

        [JsonPropertyName("localization")]
        public object Localization { get; set; }

        [JsonPropertyName("version")]
        public string Version { get; set; }

        [JsonPropertyName("creationDate")]
        public string CreationDate { get; set; }
    }
}
