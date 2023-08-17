import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Project } from '../../types';
import { instance } from '../../APIs/Projects';
import { IssueTable } from '../../Components/exports';

function ProjectDetails({ poster }: { poster: string | undefined }) {

    const { id } = useParams()

    const [project, setProject] = useState<Project | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        ; (async () => {
            const response = await instance.get(Number(id))

            if (response.ok && response.data !== undefined) {
                setProject(response.data)
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
        <div>
            <h3>{project?.title.toUpperCase()}</h3>
            <div>
                <p>{project?.issues.length} Current Issues</p>
                <a href={`/project/${project?.id}/new-issue`}>Create a new issue</a>
                {(poster !== undefined && poster === project?.poster) && (
                    <a href={`/project/${project?.id}/edit`}>Edit project</a>
                ) }
            </div>
            <hr />
            <h4>Issues</h4>
            <IssueTable issues={project?.issues!} />
        </div>
    )
  
}

export default ProjectDetails;