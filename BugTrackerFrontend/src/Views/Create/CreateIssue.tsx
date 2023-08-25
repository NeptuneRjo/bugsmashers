import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IssueModel from '../../Models/IssueModel';
import { Label, Priority, Project, ServiceContextType, Status } from '../../types';
import "../../Styles/CreateIssue.css"
import { Loader } from '../../Components/exports';
import { ServiceContext } from '../../App';

function CreateIssue() {

    const { projId } = useParams()
    const navigate = useNavigate()

    const [issue, setIssue] = useState<IssueModel>({
        title: '',
        description: '',
        solved: false,
        status: '',
        label: '',
        priority: '',
    })

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<unknown | null>(null)

    const { service } = useContext(ServiceContext) as ServiceContextType

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        setLoading(true)

        service.projects.add(Number(projId), issue)
            .then((response: Project) => {
                const issues = [...response.issues]

                navigate(`/project/${projId}/issue/${issues.pop()!.id}`)
            })
            .catch((err: unknown) => {
                setError(err)
                setLoading(false)
            })
    }

    if (loading) {
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
        <form onSubmit={(event) => handleSubmit(event)} id="create-issue">
            <h3>Create a new issue</h3>
            <div>
                <label htmlFor="title">Title</label>
                <input required type="text" name="title" value={issue.title} onChange={(e) => setIssue({ ...issue, title: e.target.value })} />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea required name="description" value={issue.description} onChange={(e) => setIssue({ ...issue, description: e.target.value })} ></textarea>
            </div>
            <div>
                <label htmlFor="status">Status</label>
                <select name="status" value={issue.status} onChange={(e) => setIssue({ ...issue, status: e.target.value })}>
                    {Object.values(Status).map((value, key) => (
                        <option key={key}  value={value}>{value}</option>
                    )) }
                </select>
            </div>
            <div>
                <label htmlFor="label">Label</label>
                <select name="label" value={issue.label} onChange={(e) => setIssue({ ...issue, label: e.target.value })}>
                    {Object.values(Label).map((value, key) => (
                        <option key={key} value={value}>{value}</option>
                    )) }
                </select>
            </div>
            <div>
                <label htmlFor="priority">Priority</label>
                <select name="priority" value={issue.priority} onChange={(e) => setIssue({ ...issue, priority: e.target.value })}>
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