export interface ProjectModel {
    title: string
}

export interface Project {
    id: number,
    title: string
    issues: object[]
    created_at: Date
    poster: string
}

export interface IssueModel {
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
    backlog,
    todo,
    in_progress,
    done,
    cancelled
}

export enum Label {
    bug,
    feature,
    documentation,
    needs_investigation,
    question,
    help_wanted
}

export enum Priority {
    low,
    medium,
    high
}

export interface IProjects {
    getAll(): Promise<any>
    get(id: number): Promise<any>
    create(model: ProjectModel): Promise<any>
    update(id: number, projectModel: ProjectModel): Promise<any>
    add(id: number, issueModel: IssueModel): Promise<any>
    delete(id: number): Promise<any>
}

export interface IIssues {
    getAll(): Promise<any>
    get(id: number): Promise<any>
    update(id: number, model: IssueModel): Promise<any>
    delete(id: number): Promise<any>
    add(id: number, comment: CommentModel): Promise<any>
}