using System.ComponentModel.DataAnnotations;

namespace BugTracker.DAL.Models
{
    public class CommentModel
    {
        [Required]
        public string Content { get; set; }

        [Required]
        public string Poster { get; set; }
    }
}
