namespace BugTrackerMvc.DTOs
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Poster { get; set; }

        public int IssueId { get; set; }
    }
}
