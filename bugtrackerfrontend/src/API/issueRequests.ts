const url: string = "https://localhost:7104"
let options: RequestInit = {
    method: 'GET'
}

enum LabelType {
    Bug = "Bug",
    Feature = "Feature",
    Documentation = "Documentation",
    NeedsInvestigation = "Needs Investigation",
    Question = "Question",
    HelpWanted = "Help Wanted"
}

enum StatusType {
    Backlog = "Backlog",
    Todo = "Todo",
    InProgress = "In Progress",
    Done = "Done",
    Cancelled = "Cancelled"
}

enum PriorityType {
    Low = "Low",
    Medium = "Medium",
    High = "High"
}

interface Issue {
    Id: number,
    Title: string,
    Description: string,
    Solved: boolean,
    Poster: string,
    Status: StatusType,
    Label: LabelType,
    Priority: PriorityType
    Comments: Comment[]
}

interface Comment {
    Id: number,
    Content: string,
    Author: string,
    IssueId: number,
    Issue: Issue
}

export const getIssues = async (): Promise<Issue | null> => {
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

export const getUserIssues = async (): Promise<Issue | null> => {
    const response = await fetch(`${url}/issues/user-issues`, options)

    if (response.ok) {
        const json = await response.json()

        return json
    }

    return null
}

export const getUserComments = async (user: string): Promise<Comment | null> => {
    const response = await fetch(`${url}/issues/user-comments`, options)

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
