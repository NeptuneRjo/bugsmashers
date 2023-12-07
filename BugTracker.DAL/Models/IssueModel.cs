namespace BugTracker.DAL.Models
{
    public class IssueModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Solved { get; set; }
        public string? Poster { get; set; }

        public string Status { get; set; }
        public string Priority { get; set; }
        public string Label { get; set; }
        public DateTime CreatedAt { get; set; }

        public DateTime LastUpdated { get; set; }
    }
}
