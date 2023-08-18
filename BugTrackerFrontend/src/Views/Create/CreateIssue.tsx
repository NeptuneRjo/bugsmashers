import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IssueModel from '../../Models/IssueModel';
import { Label, Priority, Status } from '../../types';
import { instance } from "../../APIs/Projects"

function CreateIssue({ poster }: { poster: string | undefined }) {

    const { id } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [status, setStatus] = useState<string>(Object.values(Status)[0])
    const [label, setLabel] = useState<string>(Object.values(Label)[0])
    const [priority, setPriority] = useState<string>(Object.values(Priority)[0])
    const [solved, setSolved] = useState<boolean>(false)

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        if (poster === undefined) {
            navigate("/dashboard")
        }

        const issueModel = new IssueModel({ title, description, status, label, priority, solved })

        const response = await instance.add(Number(id), issueModel)

        if (response.ok && response.data !== undefined) {
            navigate(`/project/${id}`)
        }
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
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
                        <option key={key}  value={value}>{value}</option>
                    )) }
                </select>
            </div>
            <div>
                <label htmlFor="label">Label</label>
                <select name="label" value={label} onChange={(e) => setLabel(e.target.value)}>
                    {Object.values(Label).map((value, key) => (
                        <option key={key} value={value}>{value}</option>
                    )) }
                </select>
            </div>
            <div>
                <label htmlFor="priority">Priority</label>
                <select name="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    {Object.values(Priority).map((value, key) => (
                        <option key={key} value={value}>{value}</option>
                    )) }
                </select>
            </div>
            <button type="submit">Create Issue</button>
        </form>
    )

}

export default CreateIssue;