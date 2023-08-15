import React, { useEffect, useState } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';
import IssueModel from '../../Models/IssueModel';
import { Label, Priority, Status } from '../../types';
import { instance } from "../../APIs/Projects"

const formDataToObject = (formData: FormData) => {
    let formObject: any = {}

    for (const [key, value] of Object.entries(formData)) {
        formObject[key] = value
    }

    return formObject
}


function CreateIssue({ poster }: { poster: string | undefined }) {

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
        const issueModel = new IssueModel(formObject)

        const response = await instance.add(Number(id), issueModel)

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
            <div>
                <label htmlFor="description">Description</label>
                <input type="text" name="description" />
            </div>
            <div>
                <label htmlFor="status">Status</label>
                <select name="status">
                    {Object.values(Status).map((value, key) => (
                        <option value={value} key={key}>{value}</option>
                    )) }
                </select>
            </div>
            <div>
                <label htmlFor="label">Label</label>
                <select name="label">
                    {Object.values(Label).map((value, key) => (
                        <option value={value} key={key}>{value}</option>
                    )) }
                </select>
            </div>
            <div>
                <label htmlFor="priority">Priority</label>
                <select name="priority">
                    {Object.values(Priority).map((value, key) => (
                        <option value={value} key={key}>{value}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Create Issue</button>
        </form>
    )

}

export default CreateIssue;