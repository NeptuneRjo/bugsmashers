namespace BugTracker.Models
{
    public class Status
    {
        public int Id { get; set; }
        public bool New { get; set; }
        public bool Open { get; set; }
        public bool Resolved { get; set; }
        public bool Closed { get; set; }
        public int IssueId { get; set; } // Required foreign key
        public Issue Issue { get; set; } = null!; // Required reference navigation to principle


        public Status()
        {
            New = false;
            Open = false;
            Resolved = false;
            Closed = false;
        }
    }
}
