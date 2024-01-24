using System.Text.Json.Serialization;

namespace BugTracker.DTO.DTOs
{
    public class ProjectListDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        
        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; }
        public string Poster { get; set; }
    }
}
