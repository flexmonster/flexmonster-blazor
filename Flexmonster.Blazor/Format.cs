using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Flexmonster.Blazor
{
    public class Format
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("thousandsSeparator")]
        public string ThousandsSeparator { get; set; }

        [JsonPropertyName("decimalSeparator")]
        public string DecimalSeparator { get; set; }

        [JsonPropertyName("decimalPlaces")]
        public int? DecimalPlaces { get; set; }

        [JsonPropertyName("maxDecimalPlaces")]
        public int? MaxDecimalPlaces { get; set; }

        [JsonPropertyName("maxSymbols")]
        public int? MaxSymbols { get; set; }

        [JsonPropertyName("negativeNumberFormat")]
        public string NegativeNumberFormat { get; set; }

        [JsonPropertyName("currencySymbol")]
        public string CurrencySymbol { get; set; }

        [JsonPropertyName("currencySymbolAlign")]
        public string CurrencySymbolAlign { get; set; }

        [JsonPropertyName("negativeCurrencyFormat")]
        public string NegativeCurrencyFormat { get; set; }

        [JsonPropertyName("positiveCurrencyFormat ")]
        public string PositiveCurrencyFormat { get; set; }

        [JsonPropertyName("nullValue ")]
        public string NullValue { get; set; }

        [JsonPropertyName("infinityValue ")]
        public string InfinityValue { get; set; }
        
        [JsonPropertyName("divideByZeroValue ")]
        public string DivideByZeroValue { get; set; }

        [JsonPropertyName("textAlign ")]
        public string TextAlign { get; set; }

        [JsonPropertyName("isPercent ")]
        public bool? IsPercent { get; set; }

        [JsonPropertyName("beautifyFloatingPoint ")]
        public bool? BeautifyFloatingPoint { get; set; }
    }
}
