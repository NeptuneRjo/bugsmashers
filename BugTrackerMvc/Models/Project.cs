using System.ComponentModel.DataAnnotations;

namespace BugTrackerMvc.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<Issue> Issues { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Poster { get; set; }

        public Project()
        {
            Issues = new List<Issue>();
            CreatedAt = DateTime.UtcNow;
        }

    }

    public class ProjectModel
    {
        [Required]
        public string Title { get; set; }
        public string? Poster { get; set; }
    }
}
