import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../../APIs/Issues';
import { Issue } from '../../types';
import "../../Styles/IssueDetails.css"

function IssueDetails({ poster }: { poster: string | undefined }) {

    const { issueId } = useParams()

    const [issue, setIssue] = useState<Issue | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const [content, setContent] = useState<string>("")

    useEffect(() => {
        ; (async () => {
            const response = await instance.get(Number(issueId))

            if (response.ok && response.data !== undefined) {
                setIssue(response.data)
                setLoading(false)
            }
        })()
    }, [])

    const handleAddComment = async () => {
        if (poster !== undefined && content.length > 0) {
            const response = await instance.add(Number(issueId), { content, poster })

            if (response.ok && response.data !== undefined) {
                setIssue(response.data)
                setContent("")
            }
        }
    }

    if (loading) {
        return (
            <div>Loading...</div>
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
                    {(poster !== undefined && poster === issue?.poster) && (
                        <a href={`/project/${issue.project_id}/issue/${issueId}/edit`}>Edit Issue</a>
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