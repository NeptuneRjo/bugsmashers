import Service from "../../src/Services/apiService"
import Features from "../../src/Features/features"

describe("Service", () => {
    describe("constructor", () => {
        it("loads and initializes the sub-components", () => {
            const service = new Service("foo")

            expect(service).toBeInstanceOf(Service)

            expect(service.issues).toBeInstanceOf(Features.Issues)
            expect(service.auth).toBeInstanceOf(Features.Auth)
            expect(service.projects).toBeInstanceOf(Features.Projects)
        })
    })
})
