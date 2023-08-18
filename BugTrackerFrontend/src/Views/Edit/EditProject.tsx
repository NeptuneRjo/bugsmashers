import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../APIs/Projects';
import ProjectModel from '../../Models/ProjectModel';

function EditProject({ poster }: { poster: string | undefined }) {

    const { projId } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(true)

    const [title, setTitle] = useState<string>("")

    useEffect(() => {
        ; (async () => {
            const response = await instance.get(Number(projId))

            if (response.ok && response.data !== undefined) {
                const project = response.data

                if (poster != project.poster) {
                    navigate(`/project/${projId}`)
                }

                setTitle(project.title)

                setLoading(false)
            }
        })()
    }, [])

    const handleUpdate = async (event: any) => {
        event.preventDefault()

        const projectModel = new ProjectModel({ title })

        setLoading(true)

        const response = await instance.update(Number(projId), projectModel)

        if (response.ok && response.data !== undefined) {
            navigate(`/project/${projId}`)
        } else {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <form onSubmit={(event) => handleUpdate(event)}>
            <div>
                <label htmlFor="title">Title</label>
                <input required type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <button type="submit">Save Changes</button>
            <a href={`/project/${projId}/delete`}>Delete project</a>
            <a href={`/project/${projId}`}>Go back</a>
        </form>
    )
}

export default EditProject;