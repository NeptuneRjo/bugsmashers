namespace BugTracker.Models
{
    public class Issue
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Status? Status { get; set; }
        public string Assignee { get; set; }
    }
}
