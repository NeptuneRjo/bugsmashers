import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../../APIs/Issues';
import { Issue, Label, Priority, Status } from '../../types';
import { getEnumValueByIndex } from '../../utils';

function IssueDetails({ poster }: { poster: string | undefined }) {

    const { id } = useParams()

    const [issue, setIssue] = useState<Issue | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const [content, setContent] = useState<string>("")

    useEffect(() => {
        ; (async () => {
            const response = await instance.get(Number(id))

            if (response.ok && response.data !== undefined) {
                setIssue(response.data)
                setLoading(false)
            }
        })()
    }, [])

    const handleAddComment = async () => {
        if (poster !== undefined && content.length > 0) {
            const response = await instance.add(Number(id), { content, poster })

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
        <div>
            <h3>{issue?.title}</h3>
            <p>{issue?.label}</p>
            <div>
                <ul>
                    <li>Status: {issue?.status}</li>
                    <li>Priority: {issue?.priority}</li>
                </ul>
                <p>Posted by {issue?.poster}</p>
            </div>
            <hr />
            <p>{issue?.description}</p>
            <hr />
            {(poster !== undefined && poster === issue?.poster) && (
                <a href={`/issue/${id}/edit`}>Edit Issue</a>
            ) }
            <h4>Comments</h4>
            {poster === undefined ? (
                <div>Sign in to post a comment</div>
            ) : (
                <>
                    <p>Add a comment</p>
                    <div>
                        <textarea name="content" onChange={(e) => setContent(e.target.value)} value={content}></textarea>
                        <button type="submit" onClick={() => handleAddComment()}>Add</button>
                    </div>
                </>
            )}
            
            {issue?.comments.length === 0 ? (
                <p>No comments yet...</p>
            ) : (
                 issue?.comments.map((comment, key) => (
                     <div key={key}>
                         <p>{comment.content}</p>
                         <span>{comment.poster}</span>
                     </div>
                ))
            )}
        </div>
    )
}

export default IssueDetails;