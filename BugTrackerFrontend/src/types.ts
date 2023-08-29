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

export type User = {
    username: string
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
    /**
     * List all of the projects
     * Include credentials to get projects by the current authenticated user
     * @param credentials
     */
    list(credentials?: boolean): any
    /**
     * Retrieve the project by its id
     * @param id
     */
    retrieve(id: number): any
    /**
     * Create a new project
     * @param model
     */
    create(model: IProjectModel): any
    /**
     * Update a project
     * @param id
     * @param data
     */
    update(id: number, data: IProjectModel): any
    /**
     * Create a new issue on a project by its id
     * @param id
     * @param data
     */
    add(id: number, data: IIssueModel): any
    /**
     * Delete a project
     * @param id
     */
    delete(id: number): any
}

export interface IIssues {
    /**
     * List all issues
     * Include credentials to get issues by the current authenticated user
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
    /**
     * List all authentication providers
     */
    list(): any
    /**
     * Retrieve the current authenticated user
     */
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