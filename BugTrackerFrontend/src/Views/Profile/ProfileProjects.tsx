import React, { useEffect, useState } from 'react';
import { Project } from '../../types';
import { instance } from "../../APIs/Projects"

function ProfileProjects() {

    const [loading, setLoading] = useState<boolean>(true)
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        ; (async () => {
            const response = await instance.getProfile()

            if (response.ok && response.data !== undefined) {
                setProjects(response.data)
                setLoading(false)
            }
        })()
    }, [])

    return (
        <table>
            <tr>
                <th>Title</th>
                <th>Issues</th>
                <th>Created At</th>
            </tr>
            {projects.map((project, key) => (
                <tr key={key}>
                    <td>{project.title}</td>
                    <td>{project.issues.length}</td>
                    <td>{project.created_at.split("T")[0]}</td>
                    <td><a href={`/project/${project.id}`}>Details</a></td>
                </tr>
            ))}
        </table>
    )
}

export default ProfileProjects;