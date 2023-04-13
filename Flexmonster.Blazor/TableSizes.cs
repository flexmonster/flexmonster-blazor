using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class TableSizes
    {
        [JsonPropertyName("columns")]
        public ColumnSize[] Columns { get; set; }

        [JsonPropertyName("rows")]
        public RowSize[] Rows { get; set; }
    }
}