import { IAuth, IService } from "../../types";

export default class Auth implements IAuth {
    service: IService

    constructor(service: IService) {
        this.service = service
    }

    list() {
        return this.service.request("authentication", "get", null)
    }

    retrieve() {
        return this.service.request("authentication/user", "get", null, true)
    }

    logout() {
        return this.service.request("authentication/signout", "get", null, true)
    }

}