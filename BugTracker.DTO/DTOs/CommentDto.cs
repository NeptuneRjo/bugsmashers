using System.Text.Json.Serialization;

namespace BugTracker.DTO.DTOs
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Poster { get; set; }
        [JsonPropertyName("issue_id")]
        public int IssueId { get; set; }
    }
}
