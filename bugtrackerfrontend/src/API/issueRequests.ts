import { Issue, Comment } from "../typings"

const url: string = "https://localhost:7104"
let options: RequestInit = {
    method: 'GET'
}

export const getIssues = async (): Promise<Issue[] | null> => {
    const response = await fetch(`${url}/issues`, options)

    if (response.ok) {
        const json = await response.json()

        return json
    }

    return null
}

export const getIssueById = async (id: number): Promise<Issue | null> => {
    const response = await fetch(`${url}/issues/${id}`, options)

    if (response.ok) {
        const json = await response.json()

        return json
    }

    return null
}

export const getUserIssues = async (user: string): Promise<Issue[] | null> => {
    options.credentials = 'include'
    const response = await fetch(`${url}/${user}/issues`, options)

    if (response.ok) {
        const json = await response.json()

        return json
    }

    return null
}

export const getUserComments = async (user: string): Promise<Comment[] | null> => {
    options.credentials = 'include'
    const response = await fetch(`${url}/${user}/comments`, options)

    if (response.ok) {
        const json = await response.json()

        return json
    }

    return null
}

export const createIssue = async (data: Issue): Promise<Issue | null> => {
    options.method = 'POST'
    options.body = JSON.stringify(data)
    options.credentials = 'include'

    const response = await fetch(`${url}/issues/create`, options)

    if (response.ok) {
        const json = await response.json()

        return json
    }

    return null
}

export const editIssue = async (id: number, data: Issue): Promise<Issue | null> => {
    options.method = 'POST'
    options.body = JSON.stringify(data)
    options.credentials = 'include'

    const response = await fetch(`${url}/issues/edit/${id}`, options)

    if (response.ok) {
        const json = await response.json()

        return json
    }

    return null
}

export const postComment = async (id: number, data: Comment): Promise<Issue | null> => {
    options.method = 'POST'
    options.body = JSON.stringify(data)
    options.credentials = 'include'

    const response = await fetch(`${url}/issues/${id}/comment`, options)

    if (response.ok) {
        const json = await response.json()

        return json
    }

    return null
}

export const deleteIssue = async (id: number): Promise<boolean> => {
    options.method = 'POST'
    options.credentials = 'include'

    const response = await fetch(`${url}/issues/delete${id}`, options)

    if (response.ok) {
        return true
    }

    return false
}
