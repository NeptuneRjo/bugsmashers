
namespace BugTrackerMvc.Models
{
    public class Issue
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Solved { get; set; }
        public string Poster { get; set; }

        public ICollection<Comment> Comments { get; set; }

        public Issue()
        {
            Solved = false;
            Comments = new List<Comment>();
        }
    }
}
