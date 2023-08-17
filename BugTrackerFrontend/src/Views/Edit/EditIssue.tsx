import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../APIs/Issues';
import IssueModel from '../../Models/IssueModel';
import { Label, Priority, Status } from '../../types';
import { getEnumValueByIndex } from '../../utils';

function EditIssue() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [status, setStatus] = useState<number>(0)
    const [label, setLabel] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [solved, setSolved] = useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>(true)

    // Array of strings containing the keys of each enum...
    // Used to map out the selects and their options
    const statusKeys: string[] = Object.keys(Status)
    const labelKeys: string[] = Object.keys(Label)
    const priorityKeys: string[] = Object.keys(Priority)

    useEffect(() => {
        ; (async () => {
            const response = await instance.get(Number(id))

            if (response.ok && response.data !== undefined) {
                const issue = response.data

                setTitle(issue.title)
                setDescription(issue.description)
                setStatus(Number(issue.status))
                setLabel(Number(issue.label))
                setPriority(Number(issue.priority))
                setSolved(issue.solved)

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
                <select name="status" value={status} onChange={(e) => setStatus(Number(e.target.value))}>
                    {statusKeys.map((key, mapKey) => (
                        // Map out the keys of the enum and set the
                        // value to the index of this key in the array of enumKeys.
                        // Extract the enum's property value using the index of the key.
                        <option key={mapKey} value={statusKeys.indexOf(key)}>
                            {getEnumValueByIndex(Status, statusKeys.indexOf(key))}
                        </option>
                    )) }
                </select>
            </div>
            <div>
                <label htmlFor="label">Label</label>
                <select name="label" value={label} onChange={(e) => setLabel(Number(e.target.value))}>
                    {labelKeys.map((key, mapKey) => (
                        <option key={mapKey} value={labelKeys.indexOf(key)}>
                            {getEnumValueByIndex(Label, labelKeys.indexOf(key))}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="priority">Priority</label>
                <select name="priority" value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
                    {priorityKeys.map((key, mapKey) => (
                        <option key={mapKey} value={priorityKeys.indexOf(key)}>
                            {getEnumValueByIndex(Priority, priorityKeys.indexOf(key))}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Save Changes</button>
            <a href={`/issue/${id}/delete`}>Delete issue</a>
            <a href={`/issue/${id}`}>Back to issue</a>
        </form>
    )
}

export default EditIssue;