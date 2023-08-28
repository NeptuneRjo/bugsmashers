import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceContext } from '../../App';
import { Loader } from '../../Components/exports';
import "../../Styles/CreateProject.css"
import { IService, Project, ServiceContextType } from '../../types';

function CreateProject() {
    const navigate = useNavigate()

    const [title, setTitle] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<unknown | null>(null)

    const { service } = useContext(ServiceContext) as ServiceContextType

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        setLoading(true)

        service.projects.create({ title })
            .then((response: Project) => {
                navigate(`/project/${response.id}`)
            })
            .catch((err: unknown) => {
                setError(err)
                setLoading(false)
            })
    }

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
        <form onSubmit={(event) => handleSubmit(event)} id="create-project">
            <div>
                <label htmlFor="title">Title</label>
                <input required type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <button type="submit">Create Project</button>
        </form>
    )
}

export default CreateProject;