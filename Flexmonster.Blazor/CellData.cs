using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class CellData
    {
        [JsonPropertyName("collapsed")]
        public bool? Collapsed { get; set; }

        [JsonPropertyName("columnIndex")]
        public int? ColumnIndex { get; set; }

        // TODO : define type
        [JsonPropertyName("columns")]
        public object[] Columns { get; set; }

        [JsonPropertyName("escapedLabel")]
        public string EscapedLabel { get; set; }

        [JsonPropertyName("expanded")]
        public bool? Expanded { get; set; }

        [JsonPropertyName("drilledUp")]
        public bool? DrilledUp { get; set; }

        [JsonPropertyName("drilledDown")]
        public bool? DrilledDown { get; set; }

        [JsonPropertyName("height")]
        public int? Height { get; set; }

        // TODO: Hierarchy object
        [JsonPropertyName("hierarchy")]
        public Hierarchy Hierarchy { get; set; }

        [JsonPropertyName("isClassicTotalRow")]
        public bool? IsClassicTotalRow { get; set; }

        [JsonPropertyName("isDrillThrough")]
        public bool? IsDrillThrough { get; set; }

        [JsonPropertyName("isGrandTotal")]
        public bool? IsGrandTotal { get; set; }

        [JsonPropertyName("isGrandTotalColumn")]
        public bool? IsGrandTotalColumn { get; set; }

        [JsonPropertyName("isGrandTotalRow")]
        public bool? IsGrandTotalRow { get; set; }

        [JsonPropertyName("isTotal")]
        public bool? IsTotal { get; set; }

        [JsonPropertyName("isTotalColumn")]
        public bool? IsTotalColumn { get; set; }

        [JsonPropertyName("isTotalRow")]
        public bool? IsTotalRow { get; set; }

        [JsonPropertyName("label")]
        public string Label { get; set; }

        [JsonPropertyName("level")]
        public int? Level { get; set; }

        //TODO: measure object
        [JsonPropertyName("measure")]
        public object Measure { get; set; }

        //TODO: member object
        [JsonPropertyName("member")]
        public object Member { get; set; }

        // !!! string | string[]
        [JsonPropertyName("recordId")]
        public string[] RecordId { get; set; }

        // CellData[] - but recursive cant serialize
        [JsonPropertyName("rowData")]
        public object RowData { get; set; }

        [JsonPropertyName("rowIndex")]
        public int? RowIndex { get; set; }

        // TODO : define type
        [JsonPropertyName("rows")]
        public object[] Rows { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("value")]
        public int? Value { get; set; }

        [JsonPropertyName("width")]
        public int? Width { get; set; }

        [JsonPropertyName("x")]
        public int? X { get; set; }

        [JsonPropertyName("y")]
        public int? Y { get; set; }
    }
}