import { IProjectModel } from "../types"
export default class ProjectModel implements IProjectModel {
    public title!: string

    constructor(params: IProjectModel) {
        Object.assign(this, params)
    }


}