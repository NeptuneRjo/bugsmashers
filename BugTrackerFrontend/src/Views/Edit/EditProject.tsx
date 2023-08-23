import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ServiceError } from '../../APIs/apiService';
import { ServiceContext } from '../../App';
import { Loader } from '../../Components/exports';
import "../../Styles/EditProject.css"
import { IService, Project } from '../../types';

function EditProject({ poster }: { poster: string | undefined }) {

    const { projId } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown | null>(null)

    const [project, setProject] = useState<Project | undefined>(undefined)

    const service = useContext(ServiceContext) as IService

    useEffect(() => {
        service.projects.retrieve(Number(projId))
            .then((response: Project) => {
                setProject(response)
                setLoading(false)
            })
            .catch((err: unknown) => {
                if (
                    err instanceof ServiceError &&
                    err.statusCode === 404
                ) {
                    navigate("/not-found")
                }
                setError(err)
                setLoading(false)
            })
    }, [])

    const handleUpdate = async (event: any) => {
        event.preventDefault()

        setLoading(true)

        service.projects.update(Number(projId), { title: project!.title })
            .then((response: Project) => {
                setProject(response)
                setLoading(false)
                navigate(`/project/${response.id}`)
            })
            .catch((err: unknown) => {
                setError(err)
                setLoading(false)
            })
    }

    const handleDelete = async () => {
        setLoading(true)

        service.projects.delete(Number(projId))
            .then(() => {
                navigate("/")
            })
            .catch((err: unknown) => {
                setError(err)
                setLoading(false)
            })
    }

    if (loading || project === undefined) {
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
        <form onSubmit={(event) => handleUpdate(event)} id="edit-project">
            <div>
                <label htmlFor="title">Title</label>
                <input required type="text" name="title" value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value })} />
            </div>
            <div id="edit-project-controls">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => handleDelete()}>Delete project</button>
            </div>
            <a href={`/project/${projId}`}>Go back</a>
        </form>
    )
}

export default EditProject;