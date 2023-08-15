import React, { useEffect, useState } from 'react';
import { Project } from '../../types';
import { instance } from "../../APIs/Projects"

function ProfileProjects({ poster }: { poster: string | undefined }) {

    const [loading, setLoading] = useState<boolean>(true)
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        ; (async () => {
            const response = await instance.getAll()

            if (response.ok && response.data !== undefined) {
                const filteredProjects = response.data.filter(project => project.poster === poster)
                setProjects(filteredProjects)
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
                    <td>{project.created_at.getDate()}</td>
                    <td><a href={`/project/${project.id}`}>Details</a></td>
                </tr>
            ))}
        </table>
    )
}

export default ProfileProjects;