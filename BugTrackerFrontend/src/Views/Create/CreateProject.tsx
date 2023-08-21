import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../APIs/Projects';
import ProjectModel from '../../Models/ProjectModel';
import "../../Styles/CreateProject.css"

function CreateProject() {
    const navigate = useNavigate()

    const [title, setTitle] = useState<string>("")

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        const projectModel = new ProjectModel({ title })
        const response = await instance.create(projectModel)

        if (response.ok && response.data !== undefined) {
            navigate(`/projects/${response.data.id}`)
        }
    }


    return (
        <form onSubmit={(event) => handleSubmit(event)} id="create-project">
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <button type="submit">Create Project</button>
        </form>
    )
}

export default CreateProject;