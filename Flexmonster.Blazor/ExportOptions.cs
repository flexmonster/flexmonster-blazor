using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class ExportOptions
    {
        [JsonPropertyName("filename")]
        public string Filename { get; set; }

        [JsonPropertyName("destinationType")]
        public string DestinationType { get; set; }

        [JsonPropertyName("excelSheetName")]
        public string ExcelSheetName { get; set; }

        [JsonPropertyName("footer")]
        public string Footer { get; set; }

        [JsonPropertyName("header")]
        public string Header { get; set; }

        [JsonPropertyName("pageFormat")]
        public string PageFormat { get; set; }

        [JsonPropertyName("pageOrientation")]
        public string PageOrientation { get; set; }

        [JsonPropertyName("showFilters")]
        public bool ShowFilters { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; }

        [JsonPropertyName("useOlapFormattingInExcel")]
        public bool UseOlapFormattingInExcel { get; set; }

        [JsonPropertyName("useCustomizeCellForData")]
        public bool UseCustomizeCellForData { get; set; }

        [JsonPropertyName("excelExportAll")]
        public bool ExcelExportAll { get; set; }

        [JsonPropertyName("requestHeaders")]
        public Dictionary<string, string> RequestHeaders { get; set; }

        [JsonPropertyName("fontUrl")]
        public string FontUrl { get; set; }

        [JsonPropertyName("alwaysEnclose")]
        public bool AlwaysEnclose { get; set; }
    }
}