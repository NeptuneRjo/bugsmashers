import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../APIs/Projects';
import ProjectModel from '../../Models/ProjectModel';
import "../../Styles/EditProject.css"
import { Project } from '../../types';

function EditProject({ poster }: { poster: string | undefined }) {

    const { projId } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(true)

    const [project, setProject] = useState<Project | undefined>(undefined)

    useEffect(() => {
        ; (async () => {
            const response = await instance.get(Number(projId))

            if (response.ok && response.data !== undefined) {
                const project = response.data

                if (poster !== project.poster) {
                    navigate(`/project/${projId}`)
                }

                setProject(project)

                setLoading(false)
            }
        })()
    }, [])

    const handleUpdate = async (event: any) => {
        event.preventDefault()

        if (project !== undefined) {
            const projectModel = new ProjectModel({ title: project.title })

            setLoading(true)

            const response = await instance.update(Number(projId), projectModel)

            if (response.ok && response.data !== undefined) {
                navigate(`/project/${projId}`)
            } else {
                setLoading(false)
            }
        }
    }

    const handleDelete = async () => {
        if (poster !== undefined && poster === project?.poster) {
            setLoading(true)

            const response = await instance.delete(Number(projId))

            if (response.ok) {
                navigate("/")
            } else {
                setLoading(false)
            }
        }
    }

    if (loading || project === undefined) {
        return (
            <div>Loading...</div>
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