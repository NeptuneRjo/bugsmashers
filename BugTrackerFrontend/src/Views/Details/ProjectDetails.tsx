import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Project } from '../../types';
import { instance } from '../../APIs/Projects';
import { IssueTable, Loader } from '../../Components/exports';
import "../../Styles/ProjectDetails.css"

function ProjectDetails({ poster }: { poster: string | undefined }) {

    const { projId } = useParams()
    const navigate = useNavigate()

    const [project, setProject] = useState<Project | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        ; (async () => {
            const response = await instance.get(Number(projId))

            if (response.ok && response.data !== undefined) {
                setProject(response.data)
                setLoading(false)
            } else if (response.status === 404) {
                navigate("/not-found")
            }
        })()
    }, [])

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <div id="project-details">
            <h3>{project?.title.toUpperCase()}</h3>
            <div id="project-details-tools">
                <p>{project?.issues.length} Issues</p>
                <a href={`/project/${project?.id}/new`}>Create a new issue</a>
                {(poster !== undefined && poster === project?.poster) && (
                    <a href={`/project/${project?.id}/edit`}>Edit project</a>
                ) }
            </div>
            <IssueTable issues={project?.issues!} />
        </div>
    )
  
}

export default ProjectDetails;