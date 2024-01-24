using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.DAL.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<Issue> Issues { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Poster { get; set; }

        public Project()
        {
            Issues = new List<Issue>();
            CreatedAt = DateTime.UtcNow;
        }
    }
}
