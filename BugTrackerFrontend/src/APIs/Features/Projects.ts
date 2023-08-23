import { IProjects, IIssueModel, IProjectModel, IService } from "../../types"

export default class Projects implements IProjects {
    service: IService

    constructor(service: IService) {
        this.service = service
    }

    list(credentials: boolean = false) {
        if (credentials) {
            return this.service.request("projects", "get", null, true)
        }

        return this.service.request("projects", "get", null)
    }

    retrieve(id: number) { 
        return this.service.request(`projects/${id}`, "get", null)
    }

    create(data: IProjectModel) {
        return this.service.request("projects", "post", data, true)
    }

     update(id: number, data: IProjectModel) {
        return this.service.request(`projects/${id}`, "put", data, true)
    }

    delete(id: number) {
        return this.service.request(`projects/${id}`, "delete", null, true)
    }

    add(id: number, data: IIssueModel) {
        return this.service.request(`projects/${id}`, "post", data, true)
    }
}