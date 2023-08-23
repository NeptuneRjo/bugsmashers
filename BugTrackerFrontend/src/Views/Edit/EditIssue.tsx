import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IssueModel from '../../Models/IssueModel';
import { IService, Issue, Label, Priority, Status } from '../../types';
import "../../Styles/EditIssue.css"
import { Loader } from '../../Components/exports';
import { ServiceError } from '../../APIs/apiService';
import { ServiceContext } from '../../App';

function EditIssue({ poster }: { poster: string | undefined }) {

    const { issueId } = useParams()
    const navigate = useNavigate()

    const [issue, setIssue] = useState<Issue | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown | null>(null)

    const service = useContext(ServiceContext) as IService

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

    const handleUpdate = async (event: any) => {
        event.preventDefault()

        setLoading(true)

        // handleUpdate is not accessable if issue is undefined
        // so we can assert that it isn't undefined
        const model = new IssueModel({ ...issue! }) 

        service.issues.update(Number(issueId), model)
            .then((response: Issue) => {
                navigate(`/project/${response?.project_id}/issues/${response?.id}`)
            })
            .catch((err: unknown) => {
                setLoading(false)
                setError(err)
            })
    }

    const handleDelete = async () => {
        setLoading(true)

        service.issues.delete(Number(issueId))
            .then(() => {
                navigate(`/project/${issue?.project_id}`)
            })
            .catch((err: unknown) => {
                setError(err)
                setLoading(false)
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
        <form onSubmit={(event) => handleUpdate(event)} id="edit-issue">
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