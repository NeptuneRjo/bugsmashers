import { CommentModel, IIssues, IssueModel } from "../../types";

export default class Issues implements IIssues {
    private options: RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    baseURL: string

    constructor (baseURL: string) {
        this.baseURL = baseURL
    }

    async getAll(): Promise<any> {
        const response = await fetch(`${this.baseURL}/api/issues`, this.options)
        let data: Response | undefined = undefined

        if (response.ok) {
            data = await response.json()
        }

        return { status: response.status, data }
    }

    async get(id: number): Promise<any> {
        const response = await fetch(`${this.baseURL}/api/issues/${id}`, this.options)
        let data: Response | undefined = undefined

        if (response.ok) {
            data = await response.json()
        }

        return { status: response.status, data }
    }

    async update(id: number, model: IssueModel): Promise<any> {
        const options = this.options

        options.method = "PUT"
        options.body = JSON.stringify(model)
        options.credentials = "include"

        const response = await fetch(`${this.baseURL}/api/issues/${id}`, options)
        let data: Response | undefined = undefined

        if (response.ok) {
            data = await response.json()
        }

        return { status: response.status, data }
    }

    async delete(id: number): Promise<any> {
        const options = this.options

        options.method = "DELETE"
        options.credentials = "include"

        const response = await fetch(`${this.baseURL}/api/issues/${id}`, options)
        let data: Response | undefined = undefined

        if (response.ok) {
            data = await response.json()
        }

        return { status: response.status, data }
    }

    async add(id: number, comment: CommentModel): Promise<any> {
        const options = this.options

        options.method = "POST"
        options.body = JSON.stringify(comment)
        options.credentials = "include"

        const response = await fetch(`${this.baseURL}/api/issues/${id}`, options)
        let data: Response | undefined = undefined

        if (response.ok) {
            data = await response.json()
        }

        return { status: response.status, data }
    }

}