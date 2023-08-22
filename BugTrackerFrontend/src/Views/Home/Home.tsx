import React, { useEffect, useState } from 'react';
import { instance } from '../../APIs/Projects';
import { Loader, ProjectTable } from '../../Components/exports';
import { Project } from '../../types';
import "../../Styles/HomeView.css";


function Home() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | undefined>(undefined)

    useEffect(() => {
        ; (async () => {
            const response = await instance.getAll()

            if (response.ok && response.data !== undefined) {
                setLoading(false)
                setProjects(response.data)
            } else {
                setLoading(false)
                setError("Something went wrong")
            }
        })()
    }, [])

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <div id="home">
            <h2>Projects</h2>
            {error !== undefined && <span>{error}</span> }
            <ProjectTable projects={projects} />
        </div>
    );
}

export default Home;