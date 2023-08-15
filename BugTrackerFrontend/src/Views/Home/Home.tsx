import React, { useEffect, useState } from 'react';
import Projects from '../../APIs/Projects';
import { Project } from '../../../types';

function Home({ poster }: { poster: string | undefined }) {
    const url = process.env.REACT_APP_BASE_URL 
    const instance = new Projects(url ? url : "https://localhost:7104")

    const projectKeyReference: Omit<Project, "id" | "poster"> = {
        title: '',
        issues: [],
        created_at: new Date(),
    }

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
                    {Object.keys(projectKeyReference).map(key => (
                        <th>{key.replace("_", " ").toUpperCase()}</th>
                    ))}
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