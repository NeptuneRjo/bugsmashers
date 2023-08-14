import { IProjects, IssueModel, ProjectModel } from "../types"

export default class Projects implements IProjects {
    private options: RequestInit = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    }

    baseURL: string

    constructor(baseURL: string) {
        this.baseURL = baseURL

    }

    async getAll() {
        const response = await fetch(`${this.baseURL}/api/projects`, this.options)
        let data: Response | undefined = undefined

        if (response.ok) {
            data = await response.json()
        }

        return { status: response.status, data }
    }

    async get(id: number) { 
        const response = await fetch(`${this.baseURL}/api/projects/${id}`, this.options)
        let data: Response | undefined = undefined

        if (response.ok) {
            data = await response.json()
        }

        return { status: response.status, data }
    }

    async create(model: ProjectModel) {
        const options: RequestInit = this.options

        options.method = "POST"
        options.credentials = "include"
        options.body = JSON.stringify(model)

        const response = await fetch(`${this.baseURL}/api/projects`, options)
        let data: Response | undefined = undefined

        if (response.ok) {
            data = await response.json()
        }

        return { status: response.status, data }
    }

    async update(id: number, model: ProjectModel): Promise<any> {
        const options: RequestInit = this.options

        options.method = "PUT"
        options.credentials = "include"
        options.body = JSON.stringify(model)

        const response = await fetch(`${this.baseURL}/api/projects/${id}`, options)
        let data: Response | undefined = undefined

        if (response.ok) {
            data = await response.json()
        }

        return { status: response.status, data }
    }

    async delete(id: number): Promise<any> {
        const options: RequestInit = this.options

        options.method = "DELETE"
        options.credentials = "include"

        const response = await fetch(`${this.baseURL}/api/projects/${id}`, options)
        let data: Response | undefined = undefined

        if (response.ok) {
            data = await response.json()
        }

        return { status: response.status, data }
    }

    async add(id: number, issueModel: IssueModel): Promise<any> {
        const options: RequestInit = this.options

        options.method = "POST"
        options.body = JSON.stringify(issueModel)
        options.credentials = "include"

        const response = await fetch(`${this.baseURL}/api/projects/${id}`, options)
        let data: Response | undefined = undefined

        if (response.ok) {
            data = await response.json()
        }

        return { status: response.status, data }
    }
}

