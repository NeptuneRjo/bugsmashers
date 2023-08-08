using AutoMapper;
using BugTrackerMvc.CustomExceptions;
using BugTrackerMvc.Interfaces;
using BugTrackerMvc.Models;
using System.Reflection;

namespace BugTrackerMvc.Services
{
    public class IssueService : IIssueService
    {
        private readonly IIssueRepository _repository;
        private readonly IMapper _mapper;

        public IssueService(IIssueRepository repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<Issue> AddComment(int id, CommentModel commentModel)
        {
            Issue issue = await _repository.GetByQuery(e => e.Id == id, e => e.Comments);

            if (issue == null)
                throw new ObjectNotFoundException($"No issue with the id of {id} was found");

            Comment comment = _mapper.Map<Comment>(commentModel);

            comment.Issue = issue;

            issue = await _repository.AddComment(issue.Id, comment);

            return issue;
        }

        public async Task<Issue> CreateIssue(IssueModel issueModel)
        {
            Issue issue = _mapper.Map<Issue>(issueModel);

            issue.Comments = new List<Comment>();

            _repository.Add(issue);

            return issue;
        }

        public async Task<bool> Delete(int id, string poster)
        {
            Issue issue = await _repository.GetByQuery(e => e.Id == id);

            if (issue == null)
                throw new ObjectNotFoundException($"No issue with the id of {id} was found");

            if (issue.Poster != poster)
                throw new UnauthorizedAccessException("Credentials do not match");

            try
            {
                _repository.Delete(issue.Id);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<Issue> UpdateIssue(int id, IssueModel issueModel)
        {
            Issue issue = await _repository.GetByQuery(e => e.Id == id, e => e.Comments);

            if (issue == null)
                throw new ObjectNotFoundException($"No issue with the id of {id} was found");

            if (issue.Poster != issueModel.Poster)
                throw new UnauthorizedAccessException("Credentials do not match");

            Type modelType = issueModel.GetType();
            PropertyInfo[] properties = modelType.GetProperties();

            foreach (PropertyInfo property in properties)
            {
                string propertyName = property.Name;
                object propertyValue = property.GetValue(issueModel);

                Type issueType = issue.GetType();

                if (propertyValue != null)
                {
                    PropertyInfo issueProp = issueType.GetProperty(propertyName);

                    issueProp.SetValue(issue, propertyValue);
                }
            }

            _repository.Update(issue.Id, issue);

            return issue;
        }

        public async Task<Issue> GetIssue(int id)
        {
            Issue issue = await _repository.GetByQuery(e => e.Id == id, e => e.Comments);

            if (issue == null)
                throw new ObjectNotFoundException($"No issue with the id of {id} was found");

            return issue;
        }

        public async Task<Issue> GetIssue(int id, string poster)
        {
            Issue issue = await _repository.GetByQuery(e => e.Id == id, e => e.Comments);

            if (issue == null)
                throw new ObjectNotFoundException($"No issue with the id of {id} was found");

            if (issue.Poster != poster)
                throw new UnauthorizedAccessException("Invalid credentials");

            return issue;
        }

        public async Task<ICollection<Issue>> GetIssues()
        {
            ICollection<Issue> issues = await _repository.GetAllByQuery(e => e.Id > 0, e => e.Comments);

            if (issues == null)
                throw new ObjectNotFoundException($"No issues found");

            return issues;
        }

        public async Task<ICollection<Issue>> GetIssues(string poster)
        {
            ICollection<Issue> issues = await _repository.GetAllByQuery(e => e.Poster == poster, e => e.Comments);

            if (issues == null)
                throw new ObjectNotFoundException($"No issues found");

            return issues;

        }
    }
}
