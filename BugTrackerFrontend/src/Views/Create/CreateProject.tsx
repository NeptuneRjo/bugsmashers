import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../APIs/Projects';
import ProjectModel from '../../Models/ProjectModel';
import { formDataToObject } from '../../utils';

function CreateProject({ poster }: { poster: string | undefined }) {
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (poster === undefined) {
            navigate("/dashboard")
        }
    }, [])

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        const data = new FormData(event.target)

        const formObject = formDataToObject(data)
        const projectModel = new ProjectModel(formObject)

        const response = await instance.create(projectModel)

        if (response.ok && response.data !== undefined) {
            navigate(`/projects/${id}`)
        }
    }


    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" />
            </div>
            <button type="submit">Create Project</button>
        </form>
    )
}

export default CreateProject;