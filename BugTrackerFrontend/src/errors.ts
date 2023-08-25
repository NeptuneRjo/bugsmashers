export class ServiceError extends Error {
    statusCode: number | null
    statusText: string | null
    data: unknown | null

    constructor(
        message: string,
        statusCode: number | null = null,
        statusText: string | null = null,
        data: unknown | null
    ) {
        super(message)
        this.name = "ServiceError"
        this.statusCode = statusCode
        this.statusText = statusText
        this.data = data
    }
}