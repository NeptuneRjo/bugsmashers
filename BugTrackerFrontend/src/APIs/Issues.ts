import { CommentModel, IIssues, Issue, IIssueModel } from "../types";

export default class Issues implements IIssues {
    private options: RequestInit = {
        method: "GET",
    }

    baseURL: string

    constructor (baseURL: string) {
        if (baseURL.endsWith("/")) {
            this.baseURL = baseURL.slice(0, -1)
        } else {
            this.baseURL = baseURL
        }
    }

    async getAll() {
        const response = await fetch(`${this.baseURL}/api/issues`, this.options)
        let data: Issue[] | undefined = undefined

        data = await response.json()

        return { status: response.status, ok: response.ok, data }
    }

    async get(id: number) {
        const response = await fetch(`${this.baseURL}/api/issues/${id}`, this.options)
        let data: Issue | undefined = undefined

        data = await response.json()

        return { status: response.status, ok: response.ok, data }
    }

    async update(id: number, model: IIssueModel) {
        const options = this.options

        options.method = "PUT"
        options.body = JSON.stringify(model)
        options.credentials = "include"

        const response = await fetch(`${this.baseURL}/api/issues/${id}`, options)
        let data: Response | undefined = undefined

        data = await response.json()

        return { status: response.status, ok: response.ok, data }
    }

    async delete(id: number) {
        const options = this.options

        options.method = "DELETE"
        options.credentials = "include"

        const response = await fetch(`${this.baseURL}/api/issues/${id}`, options)
        let data: Response | undefined = undefined

        data = await response.json()

        return { status: response.status, ok: response.ok, data }
    }

    async add(id: number, comment: CommentModel) {
        const options = this.options

        options.method = "POST"
        options.body = JSON.stringify(comment)
        options.credentials = "include"

        const response = await fetch(`${this.baseURL}/api/issues/${id}`, options)
        let data: Response | undefined = undefined

        data = await response.json()

        return { status: response.status, ok: response.ok, data }
    }

}

const url = process.env.REACT_APP_BASE_URL
const instance = new Issues(url ? url : "https://localhost:7104")

export { instance }