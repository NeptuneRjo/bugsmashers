import React, { useContext, useEffect, useState } from 'react';
import { IService, Project } from '../../types';
import { Loader, ProjectTable } from '../../Components/exports';
import { ServiceContext } from '../../App';

function ProfileProjects() {

    const [loading, setLoading] = useState<boolean>(true)
    const [projects, setProjects] = useState<Project[]>([])

    const [error, setError] = useState<unknown | null>(null)

    const service = useContext(ServiceContext) as IService

    useEffect(() => {
        service.projects.list(true)
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
        <ProjectTable projects={projects} />
    )
}

export default ProfileProjects;