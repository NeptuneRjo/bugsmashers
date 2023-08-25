export type Project = {
    id: number,
    title: string
    issues: Issue[]
    created_at: string
    poster: string
}

export interface IProjectModel {
    title: string
}

export interface IIssueModel {
    title: string
    description?: string | null
    solved: boolean
    status: string
    label: string
    priority: string
}

export type Issue = {
    id: number
    title: string
    description: string
    solved: boolean
    poster: string
    status: string
    label: string
    priority: string
    project_id: number
    comments: Comment[]
}

export type Comment = {
    id: number
    content: string
    poster: string
    issue_id: number
}

export type CommentModel = {
    content: string
    poster?: string | null
}

export enum Status {
    backlog = "Backlog",
    todo = "Todo",
    in_progress = "In Progress",
    done = "Done",
    cancelled = "Cancelled"
}

export enum Label {
    bug = "Bug",
    feature = "Feature",
    documentation = "Documentation",
    needs_investigation = "Needs Investigation",
    question = "Question",
    help_wanted = "Help Wanted"
}

export enum Priority {
    low = "Low", 
    medium = "Medium",
    high = "High"
}

export interface IProjects {
    list(credentials?: boolean): any
    retrieve(id: number): any
    create(model: IProjectModel): any
    update(id: number, data: IProjectModel): any
    add(id: number, data: IIssueModel): any
    delete(id: number): any
}

export interface IIssues {
    /**
     * List all issues
     * Include credentials to list all issues by the current poster
     * @param {boolean} credentials
     */
    list(credentials?: boolean): any
    /**
     * Retrieve the issue by id
     * @param {number} id
     */
    retrieve(id: number): any
    /**
     * Update the issue by id
     * @param {number} id
     * @param {IIssueModel} data
     */
    update(id: number, data: IIssueModel): any
    /**
     * Delete the issue by id
     * @param {number} id
     */
    delete(id: number): any
    /**
     * Add a comment to the issue by id
     * @param {number} id
     * @param {CommentModel} data
     */
    comment(id: number, data: CommentModel): any
}

export interface IAuth {
    list(): any
    retrieve(): any
    logout(): any
}

export interface IService {
    issues: IIssues
    projects: IProjects
    auth: IAuth
    request(endpoint: string, method: string, data?: null | object, withCredentials?: boolean): any
}

export type ServiceContextType = {
    service: IService
    poster: string | null
    updatePoster: (update: string | null) => void
}