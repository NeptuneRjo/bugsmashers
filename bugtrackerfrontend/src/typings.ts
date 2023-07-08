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

export interface Comment {
    Id: number,
    Content: string,
    Author: string,
    IssueId: number,
    Issue: Issue
}

export interface Provider {
    Name: string,
    DisplayName: string
}