import React, { useEffect, useState } from 'react';
import { instance } from '../../APIs/Projects';
import { Project } from '../../types';

function Home() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)

    useEffect(() => {
        ; (async () => {
            const response = await instance.getAll()

            if (response.ok && response.data !== undefined) {
                setLoading(false)
                setProjects(response.data)
            } else {
                setLoading(false)
                setError(response.data)
            }
        })()
    }, [])

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div>
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
                )) }
            </table>
        </div>
    );
}

export default Home;