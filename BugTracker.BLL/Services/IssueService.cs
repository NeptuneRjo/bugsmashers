using AutoMapper;
using BugTracker.BLL.Services.IServices;
using BugTracker.DAL.Entities;
using BugTracker.DAL.Models;
using BugTracker.DAL.Repositories.IRepositories;
using BugTracker.DTO.DTOs;

namespace BugTracker.BLL.Services
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

        public async Task<IssueDto> AddComment(int id, string poster, CommentModel commentModel)
        {
            Issue issue = await _repository.GetByQuery(e => e.Id == id, e => e.Comments);

            if (issue == null)
                throw new KeyNotFoundException($"No issue with the id of {id} was found");

            if (commentModel.Poster == null)
                commentModel.Poster = poster;

            if (commentModel.Poster != poster)
                throw new ArgumentException("Model/Authorization parameters do not match");

            Comment comment = _mapper.Map<Comment>(commentModel);

            comment.Issue = issue;

            issue = await _repository.AddComment(issue.Id, comment);

            IssueDto dto = _mapper.Map<IssueDto>(issue);

            return dto;
        }

        public async Task<IssueDto> CreateIssue(string poster, IssueModel issueModel)
        {
            Issue issue = _mapper.Map<Issue>(issueModel);

            issue.CreatedAt = DateTime.UtcNow;
            issue.LastUpdated = DateTime.UtcNow;

            issue.Comments = new List<Comment>();

            if (issue.Poster == null)
                issue.Poster = poster;

            if (issue.Poster != poster)
                throw new UnauthorizedAccessException("Credentials do not match");

            await _repository.Add(issue);

            IssueDto dto = _mapper.Map<IssueDto>(issue);

            return dto;
        }

        public async Task<bool> Delete(int id, string poster)
        {
            Issue issue = await _repository.GetByQuery(e => e.Id == id);

            if (issue == null)
                throw new KeyNotFoundException($"No issue with the id of {id} was found");

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

        public async Task<IssueDto> UpdateIssue(int id, string poster, IssueModel issueModel)
        {
            Issue issue = await _repository.GetByQuery(e => e.Id == id, e => e.Comments);

            if (issue == null)
                throw new KeyNotFoundException($"No issue with the id of {id} was found");

            if (issue.Poster != poster)
                throw new UnauthorizedAccessException("Credentials do not match");

            if (issueModel.Poster == null)
                issueModel.Poster = poster;

            issue = _mapper.Map(issueModel, issue);

            if (issue.CreatedAt == DateTime.Parse("0001-01-01T00:00:00"))
                issue.CreatedAt = DateTime.UtcNow;

            issue.LastUpdated = DateTime.UtcNow;

            _repository.Update(issue);

            IssueDto dto = _mapper.Map<IssueDto>(issue);

            return dto;
        }

        public async Task<IssueDto> GetIssue(int id)
        {
            Issue issue = await _repository.GetByQuery(e => e.Id == id, e => e.Comments);

            if (issue == null)
                throw new KeyNotFoundException($"No issue with the id of {id} was found");

            IssueDto dto = _mapper.Map<IssueDto>(issue);

            return dto;
        }

        public async Task<Issue> GetIssue(int id, string poster)
        {
            Issue issue = await _repository.GetByQuery(e => e.Id == id, e => e.Comments);

            if (issue == null)
                throw new KeyNotFoundException($"No issue with the id of {id} was found");

            if (issue.Poster != poster)
                throw new UnauthorizedAccessException("Invalid credentials");

            return issue;
        }

        public async Task<ICollection<IssueDto>> GetIssues()
        {
            ICollection<Issue> issues = await _repository.GetAllByQuery(e => e.Id > 0, e => e.Comments);

            ICollection<IssueDto> dtos = _mapper.Map<ICollection<IssueDto>>(issues);

            return dtos;
        }

        public async Task<ICollection<IssueDto>> GetIssues(string poster)
        {
            ICollection<Issue> issues = await _repository.GetAllByQuery(e => e.Poster == poster, e => e.Comments);

            ICollection<IssueDto> dtos = _mapper.Map<ICollection<IssueDto>>(issues);

            return dtos;

        }
    }
}
