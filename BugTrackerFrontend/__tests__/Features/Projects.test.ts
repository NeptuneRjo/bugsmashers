import Service from "../../src/Services/apiService"
import Projects from "../../src/Features/Projects"
import { jest } from '@jest/globals';
import { IService } from "../../src/types";

jest.mock("../../src/Services/apiService")

let requestMock: jest.Mock<IService['request']>
let mockService: Service

beforeEach(() => {
    (Service as jest.Mock).mockClear(); // Clear mock implementation

    requestMock = jest.fn();
    requestMock.mockReturnValue('return');

    (Service as jest.Mock).mockImplementation(() => ({
        request: requestMock,
    }));

    mockService = new Service('foo');
});


describe("Projects", () => {
    describe("list", () => {
        it("proxies the request method", () => {
            const projects = new Projects(mockService)
            const returnValue = projects.list()

            expect(requestMock).toHaveBeenLastCalledWith("projects", "get", null)
            expect(returnValue).toBe("return")
        })
    })

    describe("retrieve", () => {
        it("proxies the request method", () => {
            const projects = new Projects(mockService)
            const returnValue = projects.retrieve(1)

            expect(requestMock).toHaveBeenLastCalledWith("projects/1", "get", null)
            expect(returnValue).toBe("return")
        })
    })

    describe("update", () => {
        it("proxies the request method", () => {
            const projects = new Projects(mockService)
            const data = {
                title: "foo",
            }
            const returnValue = projects.update(1, data)

            expect(requestMock).toHaveBeenLastCalledWith("projects/1", "put", data, true)
            expect(returnValue).toBe("return")
        })
    })

    describe("delete", () => {
        it("proxies the request method", () => {
            const projects = new Projects(mockService)
            const returnValue = projects.delete(1)

            expect(requestMock).toHaveBeenLastCalledWith("projects/1", "delete", null, true)
            expect(returnValue).toBe("return")
        })
    })

    describe("add", () => {
        it("proxies the request method", () => {
            const projects = new Projects(mockService)
            const data = {
                title: "foo",
                solved: false,
                status: "foo",
                label: "foo",
                priority: "foo"
            }
            const returnValue = projects.add(1, data)

            expect(requestMock).toHaveBeenLastCalledWith("projects/1", "post", data, true)
            expect(returnValue).toBe("return")
        })
    })
})
