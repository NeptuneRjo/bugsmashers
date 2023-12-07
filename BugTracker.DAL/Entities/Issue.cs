using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.DAL.Entities
{
    public class Issue
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Solved { get; set; }
        public string Poster { get; set; }

        public string Status { get; set; }
        public string Priority { get; set; }
        public string Label { get; set; }

        public ICollection<Comment> Comments { get; set; }

        public Project Project { get; set; }
        public int ProjectId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastUpdated { get; set; }
    }
}
