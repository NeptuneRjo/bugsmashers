import React, { useEffect, useState } from 'react';
import { Project } from '../../types';
import { instance } from "../../APIs/Projects"
import { ProjectTable } from '../../Components/exports';

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

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <ProjectTable projects={projects} />
    )
}

export default ProfileProjects;