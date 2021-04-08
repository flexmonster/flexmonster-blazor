using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class TableSizes
    {
        [JsonPropertyName("columns")]
        public ColumnSize columns { get; set; }

        [JsonPropertyName("rows")]
        public RowSize rows { get; set; }
    }
}