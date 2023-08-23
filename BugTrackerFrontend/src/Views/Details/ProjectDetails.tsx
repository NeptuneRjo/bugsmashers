import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IService, Project } from '../../types';
import { IssueTable, Loader } from '../../Components/exports';
import "../../Styles/ProjectDetails.css"
import { ServiceError } from '../../APIs/apiService';
import { ServiceContext } from '../../App';

function ProjectDetails({ poster }: { poster: string | undefined }) {

    const { projId } = useParams()
    const navigate = useNavigate()

    const [project, setProject] = useState<Project | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)

    const [error, setError] = useState<unknown | null>(null)

    const service = useContext(ServiceContext) as IService

    useEffect(() => {
        service.projects.retrieve(Number(projId))
            .then((response: Project) => {
                setProject(response)
                setLoading(false)
            })
            .catch((err: unknown) => {
                if (err instanceof ServiceError) {
                    if (err.statusCode === 404) {
                        navigate("/not-found")
                    }
                }
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