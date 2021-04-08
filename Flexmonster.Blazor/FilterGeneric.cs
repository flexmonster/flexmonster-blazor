using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Flexmonster.Blazor
{
    public class Filter<T> : Filter
    {
        [JsonPropertyName("members")]
        public string[] Members { get; set; }

        [JsonPropertyName("exclude")]
        public string[] Exclude { get; set; }

        [JsonPropertyName("include")]
        public string[] Include { get; set; }

        [JsonPropertyName("query")]
        public T Query { get; set; }

        [JsonPropertyName("measure")]
        public MeasureObject Measure { get; set; }
    }
}
