import Service from "../../src/Services/apiService"
import Issues from "../../src/Features/Issues"
import { jest } from '@jest/globals';

jest.mock("../../src/APIs/apiService")

let requestMock: jest.Mock
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

describe("Issues", () => {
    describe("list", () => {
        it("proxies the request method", () => {
            const issues = new Issues(mockService)
            const returnValue = issues.list()

            expect(requestMock).toHaveBeenLastCalledWith("issues", "get", null)
            expect(returnValue).toBe("return")
        })
    })

    describe("retrieve", () => {
        it("proxies the request method", () => {
            const issues = new Issues(mockService)
            const returnValue = issues.retrieve(1)

            expect(requestMock).toHaveBeenLastCalledWith("issues/1", "get", null)
            expect(returnValue).toBe("return")
        })
    })

    describe("update", () => {
        it("proxies the request method", () => {
            const issues = new Issues(mockService)
            const data = {
                title: "foo",
                solved: false,
                status: "foo",
                label: "foo",
                priority: "foo"
            }
            const returnValue = issues.update(1, data)

            expect(requestMock).toHaveBeenLastCalledWith("issues/1", "put", data, true)
            expect(returnValue).toBe("return")
        })
    })

    describe("delete", () => {
        it("proxies the request method", () => {
            const issues = new Issues(mockService)
            const returnValue = issues.delete(1)

            expect(requestMock).toHaveBeenLastCalledWith("issues/1", "delete", null, true)
            expect(returnValue).toBe("return")
        })
    })

    describe("comment", () => {
        it("proxies the request method", () => {
            const issues = new Issues(mockService)
            const data = {
                content: "foo"
            }
            const returnValue = issues.comment(1, data)

            expect(requestMock).toHaveBeenLastCalledWith("issues/1", "post", data, true)
            expect(returnValue).toBe("return")
        })
    })
})
