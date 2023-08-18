import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../APIs/Issues';
import IssueModel from '../../Models/IssueModel';
import { Label, Priority, Status } from '../../types';
import { getEnumValueByIndex } from '../../utils';

function EditIssue({ poster }: { poster: string | undefined }) {

    const { id } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [status, setStatus] = useState<string>(Object.values(Status)[0])
    const [label, setLabel] = useState<string>(Object.values(Label)[0])
    const [priority, setPriority] = useState<string>(Object.values(Priority)[0])
    const [solved, setSolved] = useState<boolean>(false)

    const [issuePoster, setIssuePoster] = useState<string | undefined>(undefined)
    const [projectId, setProjectId] = useState<number | undefined>(undefined)

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        ; (async () => {
            const response = await instance.get(Number(id))

            if (response.ok && response.data !== undefined) {
                const issue = response.data

                setTitle(issue.title)
                setDescription(issue.description)
                setStatus(issue.status)
                setLabel(issue.label)
                setPriority(issue.priority)
                setSolved(issue.solved)

                setIssuePoster(issue.poster)
                setProjectId(issue.project_id)

                setLoading(false)
            }
        })()
    }, [])

    const handleUpdate = async (event: any) => {
        event.preventDefault()

        const issueModel = new IssueModel({ title, description, status, label, priority, solved })

        const response = await instance.update(Number(id), issueModel)
        setLoading(true)

        if (response.ok && response.data !== undefined) {
            navigate(`/issue/${id}`)
        } else {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (poster !== undefined && poster === issuePoster) {
            setLoading(true)

            const response = await instance.delete(Number(id))

            navigate(`/project/${projectId}`)

        }
    }

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <form onSubmit={(event) => handleUpdate(event)}>
            <div>
                <label htmlFor="title">Title</label>
                <input required type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <input required type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label htmlFor="status">Status</label>
                <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    {Object.values(Status).map((value, key) => (
                        <option key={key} value={value}>{value}</option>
                    )) }
                </select>
            </div>
            <div>
                <label htmlFor="label">Label</label>
                <select name="label" value={label} onChange={(e) => setLabel(e.target.value)}>
                    {Object.values(Label).map((value, key) => (
                        <option key={key} value={value}>{value}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="priority">Priority</label>
                <select name="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    {Object.values(Priority).map((value, key) => (
                        <option key={key} value={value}>{value}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => handleDelete()}>Delete Issue</button>
            <a href={`/issue/${id}`}>Back to issue</a>
        </form>
    )
}

export default EditIssue;