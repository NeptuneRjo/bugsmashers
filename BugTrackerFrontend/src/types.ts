export interface Project {
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

export interface Issue {
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

export interface Comment {
    id: number
    content: string
    poster: string
    issue_id: number
}

export interface CommentModel {
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
    getAll(): Promise<any>
    getProfile(): Promise<any>
    get(id: number): Promise<any>
    create(model: IProjectModel): Promise<any>
    update(id: number, projectModel: IProjectModel): Promise<any>
    add(id: number, issueModel: IIssueModel): Promise<any>
    delete(id: number): Promise<any>
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

export interface IService {
    request(endpoint: string, method: string, data?: null | object, withCredentials?: boolean): any
}