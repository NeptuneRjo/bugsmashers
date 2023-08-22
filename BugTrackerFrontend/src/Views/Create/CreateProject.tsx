import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../APIs/Projects';
import { Loader } from '../../Components/exports';
import ProjectModel from '../../Models/ProjectModel';
import "../../Styles/CreateProject.css"

function CreateProject() {
    const navigate = useNavigate()

    const [title, setTitle] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>(undefined)

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        const projectModel = new ProjectModel({ title })
        const response = await instance.create(projectModel)
        setLoading(true)

        if (response.ok && response.data !== undefined) {
            navigate(`/projects/${response.data.id}`)
        } else {
            setLoading(false)
            setError("An error occured while creating the project, please try again.")
        }
    }

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)} id="create-project">
            {error !== undefined && <span>{error}</span> }
            <div>
                <label htmlFor="title">Title</label>
                <input required type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <button type="submit">Create Project</button>
        </form>
    )
}

export default CreateProject;