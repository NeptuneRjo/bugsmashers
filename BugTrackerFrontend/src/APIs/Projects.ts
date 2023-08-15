import { IProjects, IIssueModel, Project, ProjectModel } from "../types"

export default class Projects implements IProjects {
    private options: RequestInit = {
        method: "GET",
    }

    baseURL: string

    constructor(baseURL: string) {
        // Remove slash if it exists
        if (baseURL.endsWith("/")) {
            this.baseURL = baseURL.slice(0, -1)
        } else {
            this.baseURL = baseURL
        }
    }

    async getAll() {
        const response = await fetch(`${this.baseURL}/api/projects`, this.options)
        let data: Project[] | undefined = undefined

        data = await response.json()        

        return { status: response.status, ok: response.ok, data }
    }

    async get(id: number) { 
        const response = await fetch(`${this.baseURL}/api/projects/${id}`, this.options)
        let data: Project | undefined = undefined

        data = await response.json()        

        return { status: response.status, ok: response.ok, data }
    }

    async create(model: ProjectModel) {
        const options: RequestInit = this.options

        options.method = "POST"
        options.credentials = "include"
        options.body = JSON.stringify(model)

        const response = await fetch(`${this.baseURL}/api/projects`, options)
        let data: Project | undefined = undefined

        data = await response.json()

        return { status: response.status, ok: response.ok, data }
    }

    async update(id: number, model: ProjectModel): Promise<any> {
        const options: RequestInit = this.options

        options.method = "PUT"
        options.credentials = "include"
        options.body = JSON.stringify(model)

        const response = await fetch(`${this.baseURL}/api/projects/${id}`, options)
        let data: Project | undefined = undefined
        
        data = await response.json()
        
        return { status: response.status, ok: response.ok, data }
    }

    async delete(id: number): Promise<any> {
        const options: RequestInit = this.options

        options.method = "DELETE"
        options.credentials = "include"

        const response = await fetch(`${this.baseURL}/api/projects/${id}`, options)
        let data: Response | undefined = undefined
        
        data = await response.json()
        
        return { status: response.status, ok: response.ok, data }
    }

    async add(id: number, issueModel: IIssueModel): Promise<any> {
        const options: RequestInit = this.options

        options.method = "POST"
        options.body = JSON.stringify(issueModel)
        options.credentials = "include"

        const response = await fetch(`${this.baseURL}/api/projects/${id}`, options)
        let data: Project | undefined = undefined
        
        data = await response.json()

        return { status: response.status, ok: response.ok, data }
    }
}

const url = process.env.REACT_APP_BASE_URL
const instance = new Projects(url ? url : "https://localhost:7104")

export { instance }