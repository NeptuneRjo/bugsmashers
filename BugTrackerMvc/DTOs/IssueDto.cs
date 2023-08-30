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

        public string Status { get; set; }
        public string Priority { get; set; }
        public string Label { get; set; }

        [JsonPropertyName("project_id")]
        public int ProjectId { get; set; }
        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; }

        [JsonPropertyName("last_updated")]
        public DateTime LastUpdated { get; set; }

        public ICollection<CommentDto> Comments { get; set; }
    }
}
