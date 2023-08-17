import { Comment, IIssueModel, Label, Priority, Status } from "../types"
export default class IssueModel implements IIssueModel {
    public title!: string;
    public description?: string | null | undefined;
    public solved!: boolean;
    public status!: number;
    public label!: number;
    public priority!: number;

    constructor(params: IIssueModel) {
        Object.assign(this, params)
    }
    

}