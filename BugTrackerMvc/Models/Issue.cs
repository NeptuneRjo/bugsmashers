
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BugTrackerMvc.Models
{
    public enum LabelType
    {
        Bug,
        Feature,
        Documentation,
        [Display(Name = "Needs Investigation")]
        [JsonPropertyName("needs_investigation")]
        NeedsInvestigation,
        Question,
        [Display(Name = "Help Wanted")]
        [JsonPropertyName("help_wanted")]
        HelpWanted,
    }

    public enum StatusType
    {
        Backlog,
        Todo,
        [Display(Name = "In Progress")]
        [JsonPropertyName("in_progress")]
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

        public Project Project { get; set; }
        public int ProjectId { get; set; }
    }

    public class IssueModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Solved { get; set; }
        public string? Poster { get; set; }

        public string Status { get; set; }
        public string Priority { get; set; }
        public string Label { get; set; }
    }

}
