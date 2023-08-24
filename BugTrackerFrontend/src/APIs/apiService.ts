import axios, { AxiosError } from "axios"
import { ServiceError } from "../errors"
import { IAuth, IIssues, IProjects, IService } from "../types"
import Features from "./features"

export default class Service implements IService {
    private baseURL: string

    issues: IIssues
    projects: IProjects
    auth: IAuth

    constructor(url: string = "") {
        const API_URL = process.env.REACT_APP_API_URL

        if (url.length > 0) {
            this.baseURL = url
        } else if (
            typeof API_URL !== "undefined" &&
            API_URL.length > 0
        ) {
            this.baseURL = API_URL
        } else {
            throw new Error("Provide the URL or define REACT_APP_API_URL in your .env file")
        }

        this.issues = new Features.Issues(this)
        this.projects = new Features.Projects(this)
        this.auth = new Features.Auth(this)
    }

    request(
        endpoint: string,
        method: string = "get",
        data: object | null = null,
        withCredentials: boolean = false
    ) {
        const headers = {
            "Content-Type": "application/json"
        }

        // Let axios serialize get request payloads as json
        const params = method === "get" ? data : null
        const requestBody = method === "get" ? null : data

        let baseURL = this.baseURL

        if (baseURL.substring(baseURL.length - 1) !== "/") {
            baseURL += "/"
        }

        const promise = axios({
            url: endpoint,
            method,
            baseURL: baseURL + "api/",
            params,
            data: requestBody,
            headers,
            withCredentials
        })

        return (
            promise
                .then((response) => {
                    if (
                        typeof response.data !== "object" ||
                        Array.isArray(response.data)
                    ) {
                        return response.data;
                    }

                    const { ...otherData } = response.data

                    return otherData
                })
                .catch((error: AxiosError) => {
                    if (!error.response) {
                        throw error
                    }

                    // eslint-disable-next-line no-throw-literal
                    throw new ServiceError(
                        `Unsuccessful response (${error.response.status}: ${error.response.statusText}) received`,
                        error.response.status,
                        error.response.statusText,
                        error.response.data,
                    )
                })
        )
    }
}

