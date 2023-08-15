import { Comment, IIssueModel, Label, Priority, Status } from "../types"
export default class IssueModel implements IIssueModel {
    public title!: string;
    public description?: string | null | undefined;
    public solved!: boolean;
    public status!: Status;
    public label!: Label;
    public priority!: Priority;

    constructor(params: IIssueModel) {
        //const { title, description, solved, status, label, priority } = jsonObj

        //this.title = title
        //this.description = description
        //this.solved = solved
        //this.status = status
        //this.label = label
        //this.priority = priority
        Object.assign(this, params)
    }
    

}