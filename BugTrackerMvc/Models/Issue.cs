
using System.ComponentModel.DataAnnotations;

namespace BugTrackerMvc.Models
{
    public enum LabelType
    {
        Bug,
        Feature,
        Documentation,
        [Display(Name = "Needs Investigation")]
        NeedsInvestigation,
        Question,
        [Display(Name = "Help Wanted")]
        HelpWanted,
    }

    public enum StatusType
    {
        Backlog,
        Todo,
        [Display(Name = "In Progress")]
        InProgress,
        Done,
        Cancelled
    }

    public enum PriorityType
    {
        Low,
        Medium,
        High
    }

    public class Issue
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Solved { get; set; }
        public string Poster { get; set; }

        public StatusType Status { get; set; }
        public PriorityType Priority { get; set; }
        public LabelType Label { get; set; }

        public ICollection<Comment> Comments { get; set; }

        //public Issue()
        //{
        //    Solved = false;
        //    Comments = new List<Comment>();
        //}
    }

    public class IssueModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Solved { get; set; }
        public string? Poster { get; set; }

        public StatusType Status { get; set; }
        public PriorityType Priority { get; set; }
        public LabelType Label { get; set; }
    }
}
