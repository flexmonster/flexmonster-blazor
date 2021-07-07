using System.Text.Json.Serialization;

namespace Flexmonster.Blazor
{
    public class Member
    {
        [JsonPropertyName("caption")]
        public string Caption { get; set; }

        [JsonPropertyName("uniqueName")]
        public string UniqueName { get; set; }

        [JsonPropertyName("hierarchyName")]
        public string HierarchyName { get; set; }

        [JsonPropertyName("hierarchyCaption")]
        public string HierarchyCaption { get; set; }

        [JsonPropertyName("dimensionName")]
        public string DimensionName { get; set; }

        [JsonPropertyName("children")]
        public object[] Children { get; set; }

        [JsonPropertyName("isLeaf")]
        public bool IsLeaf { get; set; }

        [JsonPropertyName("parentMember")]
        public string ParentMember { get; set; }
    }
}