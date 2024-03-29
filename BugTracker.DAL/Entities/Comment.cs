﻿namespace BugTracker.DAL.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Poster { get; set; }

        // Required foreign key
        public int IssueId { get; set; }
        // Required reference navigation to principle
        public Issue Issue { get; set; }
    }
}
