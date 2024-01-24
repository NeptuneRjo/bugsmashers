using System.ComponentModel.DataAnnotations;

namespace BugTracker.DAL.Models
{
    public class ProjectModel
    {
        [Required]
        public string Title { get; set; }
        public string? Poster { get; set; }
    }
}
