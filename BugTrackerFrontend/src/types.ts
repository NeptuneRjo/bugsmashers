export interface ProjectModel {
    title: string
}

export interface Project {
    id: number,
    title: string
    issues: Issue[]
    created_at: Date
    poster: string
}

export interface IIssueModel {
    title: string
    description?: string | null
    solved: boolean
    status: Status
    label: Label
    priority: Priority
}

export interface Issue {
    id: number
    title: string
    description: string
    solved: boolean
    poster: string
    status: Status
    priority: Priority
    label: Label
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
    get(id: number): Promise<any>
    create(model: ProjectModel): Promise<any>
    update(id: number, projectModel: ProjectModel): Promise<any>
    add(id: number, issueModel: IIssueModel): Promise<any>
    delete(id: number): Promise<any>
}

export interface IIssues {
    getAll(): Promise<any>
    get(id: number): Promise<any>
    update(id: number, model: IIssueModel): Promise<any>
    delete(id: number): Promise<any>
    add(id: number, comment: CommentModel): Promise<any>
}