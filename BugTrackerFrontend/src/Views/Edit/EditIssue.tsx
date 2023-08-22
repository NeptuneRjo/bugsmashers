import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../APIs/Issues';
import IssueModel from '../../Models/IssueModel';
import { Issue, Label, Priority, Status } from '../../types';
import "../../Styles/EditIssue.css"
import { Loader } from '../../Components/exports';

function EditIssue({ poster }: { poster: string | undefined }) {

    const { issueId } = useParams()
    const navigate = useNavigate()

    const [issue, setIssue] = useState<Issue | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | undefined>(undefined)

    useEffect(() => {
        ; (async () => {
            const response = await instance.get(Number(issueId))

            if (response.ok && response.data !== undefined) {
                const issue = response.data

                setIssue(issue)
                setLoading(false)
            } else if (response.status === 404) {
                navigate("/not-found")
            }
        })()
    }, [])

    const handleUpdate = async (event: any) => {
        event.preventDefault()

        if (issue !== undefined) {
            const issueModel = new IssueModel({ ...issue })

            const response = await instance.update(Number(issueId), issueModel)
            setLoading(true)

            if (response.ok && response.data !== undefined) {
                navigate(`/project/${issue.project_id}/issue/${issueId}`)
            } else {
                setLoading(false)
                setError("Failed to update issue")
            }
        }
    }

    const handleDelete = async () => {
        if (poster !== undefined && poster === issue?.poster) {
            setLoading(true)

            const response = await instance.delete(Number(issueId))

            if (response.ok) {
                navigate(`/project/${issue.project_id}`)
            } else {
                setLoading(false)
                setError("Failed to delete issue")
            }
        }
    }

    if (loading || issue === undefined) {
        return (
            <Loader />
        )
    }

    return (
        <form onSubmit={(event) => handleUpdate(event)} id="edit-issue">
            {error !== undefined && <span>{error}</span> }
            <div>
                <label htmlFor="title">Title</label>
                <input required type="text" name="title" value={issue.title} onChange={(e) => setIssue({ ...issue, title: e.target.value })} />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea required name="description" value={issue.description} onChange={(e) => setIssue({ ...issue, description: e.target.value })}></textarea>
            </div>
            <div>
                <label htmlFor="status">Status</label>
                <select name="status" value={issue.status} onChange={(e) => setIssue({ ...issue, status: e.target.value })}>
                    {Object.values(Status).map((value, key) => (
                        <option key={key} value={value}>{value}</option>
                    )) }
                </select>
            </div>
            <div>
                <label htmlFor="label">Label</label>
                <select name="label" value={issue.label} onChange={(e) => setIssue({ ...issue, label: e.target.value })}>
                    {Object.values(Label).map((value, key) => (
                        <option key={key} value={value}>{value}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="priority">Priority</label>
                <select name="priority" value={issue.priority} onChange={(e) => setIssue({ ...issue, priority: e.target.value })}>
                    {Object.values(Priority).map((value, key) => (
                        <option key={key} value={value}>{value}</option>
                    ))}
                </select>
            </div>
            <div id="edit-issue-controls">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => handleDelete()}>Delete Issue</button>
            </div>
            <a href={`/project/${issue.project_id}/issue/${issueId}`}>Back to issue</a>
        </form>
    )
}

export default EditIssue;