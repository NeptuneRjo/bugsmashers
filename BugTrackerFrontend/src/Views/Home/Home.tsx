import React, { useEffect, useState } from 'react';
import { instance } from '../../APIs/Projects';
import { ProjectTable } from '../../Components/exports';
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
            <ProjectTable projects={projects} />
        </div>
    );
}

export default Home;