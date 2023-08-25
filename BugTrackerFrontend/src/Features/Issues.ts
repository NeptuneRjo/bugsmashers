import { CommentModel, IIssues, IIssueModel, IService } from "../types";

export default class Issues implements IIssues {
    service: IService

    constructor (service: IService) {
        this.service = service
    }
    /**
     * List all issues
     * Include credentials to list all issues by the current poster
     * @param {boolean} credentials
     */
    list(credentials: boolean = false) {
        if (credentials) {
            return this.service.request("issues", "get", null, true)
        }

        return this.service.request("issues", "get", null)
    }

    /**
     * Retrieve the issue by id
     * @param {number} id
     */
    retrieve(id: number) {
        return this.service.request(`issues/${id}`, "get", null)
    }

    /**
     * Update the issue by id
     * @param {number} id
     * @param {IIssueModel} data
     */
    update(id: number, data: IIssueModel) {
        return this.service.request(`issues/${id}`, "put", data, true)
    }

    /**
     * Delete the issue by id
     * @param {number} id
     */
    delete(id: number) {
        return this.service.request(`issues/${id}`, "delete", null, true)
    }

    /**
     * Add a comment to the issue by id
     * @param {number} id
     * @param {CommentModel} data
     */
    comment(id: number, data: CommentModel) {
        return this.service.request(`issues/${id}`, "post", data, true)
    }
}