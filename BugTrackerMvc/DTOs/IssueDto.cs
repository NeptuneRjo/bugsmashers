using BugTrackerMvc.Models;
using System.Text.Json.Serialization;

namespace BugTrackerMvc.DTOs
{
    public class IssueDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Solved { get; set; }
        public string? Poster { get; set; }

        public StatusType Status { get; set; }
        public PriorityType Priority { get; set; }
        public LabelType Label { get; set; }
        [JsonPropertyName("project_id")]
        public int ProjectId { get; set; }

        public ICollection<CommentDto> Comments { get; set; }
    }
}
