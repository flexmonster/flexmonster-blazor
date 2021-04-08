using Microsoft.JSInterop;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class CellBuilder
    {
        [JsonPropertyName("attr")]
        public object Attributes { get; set; }

        [JsonPropertyName("classes")]
        public string[] Rows { get; set; }

        [JsonPropertyName("style")]
        public object Style { get; set; }

        [JsonPropertyName("tag")]
        public string Tag { get; set; }

        [JsonPropertyName("text")]
        public string Text { get; set; }

        public static List<string> ClassesToAdd = new List<string>(); 

        public void AddClass(string value)
        {
            ClassesToAdd.Add(value);
        }

        public string ToHtml()
        {
            return "";
        }
    }
}