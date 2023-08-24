import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Issue, ServiceContextType } from '../../types';
import "../../Styles/IssueDetails.css"
import { Loader } from '../../Components/exports';
import { ServiceContext } from '../../App';
import { ServiceError } from '../../errors';

function IssueDetails() {

    const { issueId } = useParams()
    const navigate = useNavigate()

    const [issue, setIssue] = useState<Issue | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown | null>(null)

    const [content, setContent] = useState<string>("")

    const { service, poster } = useContext(ServiceContext) as ServiceContextType

    useEffect(() => {
        service.issues.retrieve(Number(issueId))
            .then((response: Issue) => {
                setIssue(response)
                setLoading(false)
            })
            .catch((err: unknown) => {
                if (err instanceof ServiceError) {
                    if (err.statusCode === 404) {
                        navigate("/not-found")
                    }
                }
                setError(err)
            })
    }, [])

    const handleAddComment = async () => {
        service.issues.comment(Number(issueId), { content })
            .then((response: Issue) => {
                setIssue(response)
            })
            .catch((err: unknown) => {
                if (err instanceof ServiceError) {
                    if (err.statusCode === 404) {
                        navigate("/not-found")
                    }
                }
                setError(err)
            })
    }

    if (loading || issue === undefined) {
        return (
            <Loader />
        )
    }

    if (error !== null) {
        return (
            <div>error</div>
        )
    }

    return (
        <div id="issue-details">
            <h2>{issue?.title}</h2>
            <div id="issue-properties">
                <ul>
                    <li id="label">{issue?.label}</li>
                    <li>Status: {issue?.status}</li>
                    <li>Priority: {issue?.priority}</li>
                </ul>
                <p>
                    Posted by {issue?.poster}
                    {(poster === issue?.poster) && (
                        <a href={`/project/${issue?.project_id}/issue/${issueId}/edit`}>Edit Issue</a>
                    )}
                </p>
            </div>
            <p id="issue-description">{issue?.description}</p>
            <div id="issue-comments-controls">
                <h4>Comments</h4>
                {poster === undefined ? (
                    <p>Sign in to post a comment</p>
                ) : (
                    <div id="issue-comments-form">
                        <textarea name="content" placeholder="Leave a comment" onChange={(e) => setContent(e.target.value)} value={content}></textarea>
                        <button type="submit" onClick={() => handleAddComment()}>Add</button>
                    </div>
                )}
            </div>
            <div id="issue-comments">
                {issue?.comments.length === 0 ? (
                    <p>No comments yet...</p>
                ) : (
                     issue?.comments.map((comment, key) => (
                         <div key={key} id="comment">
                             <p>{comment.content}</p>
                             <span>{comment.poster}</span>
                         </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default IssueDetails;