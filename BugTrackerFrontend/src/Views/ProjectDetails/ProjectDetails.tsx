import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Label, Priority, Project, Status } from '../../types';
import { instance } from '../../APIs/Projects';
import { getEnumValueByIndex } from '../../utils';

function ProjectDetails() {

    const { id } = useParams()

    const [project, setProject] = useState<Project | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        ; (async () => {
            const response = await instance.get(Number(id))

            if (response.ok && response.data !== undefined) {
                setProject(response.data)
                setLoading(false)
            }
        })()
    }, [])

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            <h3>{project?.title.toUpperCase()}</h3>
            <div>
                <p>{project?.issues.length} Current Issues</p>
                <a href={`/project/${project?.id}/new-issue`}>Create a new issue</a>
            </div>
            <hr />
            <h4>Issues</h4>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Label</th>
                    <th>Poster</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Comments</th>
                </tr>
                {project?.issues.map((issue, key) => (
                    <tr key={key}>
                        <td>{issue.title}</td>
                        <td>{getEnumValueByIndex(Label, Number(issue?.label))}</td>
                        <td>{issue.poster}</td>
                        <td>{getEnumValueByIndex(Priority, Number(issue?.priority))}</td>
                        <td>{getEnumValueByIndex(Status, Number(issue?.status))}</td>
                        <td>{issue.comments.length}</td>
                        <td><a href={`/issue/${issue.id}`}>Details</a></td>
                    </tr>
                ))}
            </table>
        </div>
    )
  
}

export default ProjectDetails;