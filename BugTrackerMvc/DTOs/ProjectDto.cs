using System.Text.Json.Serialization;

namespace BugTrackerMvc.DTOs
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<IssueDto> Issues { get; set; }
        [JsonPropertyName("createed_at")]
        public DateTime CreatedAt { get; set; }
        public string Poster { get; set; }
    }
}
