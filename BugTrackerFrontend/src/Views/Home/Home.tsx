import React, { useContext, useEffect, useState } from 'react';
import { Loader, ProjectTable } from '../../Components/exports';
import { Project, ServiceContextType } from '../../types';
import "../../Styles/HomeView.css";
import { ServiceContext } from "../../App"

function Home() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown | null>(null)

    const { service } = useContext(ServiceContext) as ServiceContextType

    useEffect(() => {
        service.projects.list()
            .then((response: Project[]) => {
                setProjects(response)
                setLoading(false)
            })
            .catch((err: unknown) => {
                setError(err)
                setLoading(false)
            })
    }, [])

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
        <div id="home">
            <h2>Projects</h2>
            <ProjectTable projects={projects} />
        </div>
    );
}

export default Home;