using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class ChartOptions
    {
        [JsonPropertyName("activeMeasure")]
        public MeasureObject ActiveMeasure { get; set; }

        [JsonPropertyName("activeTupleIndex")]
        public int? ActiveTupleIndex { get; set; }

        [JsonPropertyName("autoRange")]
        public bool? AutoRange { get; set; }

        [JsonPropertyName("labelsHierarchy")]
        public string LabelsHierarchy { get; set; }

        [JsonPropertyName("multipleMeasures")]
        public int? MultipleMeasures { get; set; }

        [JsonPropertyName("oneLevel")]
        public string OneLevel { get; set; }

        [JsonPropertyName("showFilter")]
        public string ShowFilter { get; set; }

        [JsonPropertyName("showLegend")]
        public string ShowLegend { get; set; }

        [JsonPropertyName("showLegendButton")]
        public bool? ShowLegendButton { get; set; }

        [JsonPropertyName("showMeasures")]
        public bool? ShowMeasures { get; set; }

        [JsonPropertyName("showWarning")]
        public bool? ShowWarning { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("showDataLabels")]
        public bool? ShowDataLabels { get; set; }

        [JsonPropertyName("reversedAxes")]
        public bool? ReversedAxes { get; set; }

        [JsonPropertyName("showAllLabels")]
        public bool? ShowAllLabels { get; set; }

        [JsonPropertyName("showOneMeasureSelection")]
        public string ShowOneMeasureSelection { get; set; }

        [JsonPropertyName("position")]
        public string Position { get; set; }

        [JsonPropertyName("pieDataIndex")]
        public string PieDataIndex { get; set; }

        [JsonPropertyName("axisShortNumberFormat")]
        public bool? AxisShortNumberFormat { get; set; }
    }
}