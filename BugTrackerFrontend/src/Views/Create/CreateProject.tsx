import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../APIs/Projects';
import ProjectModel from '../../Models/ProjectModel';
import { formDataToObject } from '../../utils';

function CreateProject({ poster }: { poster: string | undefined }) {
    const { id } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState<string>("")

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        if (poster === undefined) {
            navigate("/dashboard")
        }

        const projectModel = new ProjectModel({ title })

        console.log(projectModel)

        const response = await instance.create(projectModel)

        if (response.ok && response.data !== undefined) {
            navigate(`/projects/${id}`)
        }
    }


    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <button type="submit">Create Project</button>
        </form>
    )
}

export default CreateProject;