export enum LabelType {
    Bug = "Bug",
    Feature = "Feature",
    Documentation = "Documentation",
    NeedsInvestigation = "Needs Investigation",
    Question = "Question",
    HelpWanted = "Help Wanted"
}

export enum StatusType {
    Backlog = "Backlog",
    Todo = "Todo",
    InProgress = "In Progress",
    Done = "Done",
    Cancelled = "Cancelled"
}

export enum PriorityType {
    Low = "Low",
    Medium = "Medium",
    High = "High"
}

export interface Issue {
    id: number,
    title: string,
    description: string,
    solved: boolean,
    poster: string,
    status: number,
    label: number,
    priority: number
    comments: Comment[]
}

export interface CleansedIssue extends Omit<Issue, "status" | "label" | "priority"> {
    status: string,
    label: string,
    priority: string
}

export interface Comment {
    id: number,
    content: string,
    author: string,
    issueId: number,
    issue: Issue
}

export interface Provider {
    name: string,
    displayName: string
}