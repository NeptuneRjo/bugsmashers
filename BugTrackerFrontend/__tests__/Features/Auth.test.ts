import Service from "../../src/Services/apiService"
import Auth from "../../src/Features/Auth"
import { jest } from '@jest/globals';

jest.mock("../../src/Services/apiService")

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

describe("Auth", () => {
    describe("list", () => {
        it("proxies the request method", () => {
            const auth = new Auth(mockService)
            const returnValue = auth.list()

            expect(requestMock).toHaveBeenLastCalledWith("authentication", "get", null)
            expect(returnValue).toBe("return")
        })
    })

    describe("retrieve", () => {
        it("proxies the request method", () => {
            const auth = new Auth(mockService)
            const returnValue = auth.retrieve()

            expect(requestMock).toHaveBeenLastCalledWith("authentication/user", "get", null, true)
            expect(returnValue).toBe("return")
        })
    })

    describe("logout", () => {
        it("proxies the request method", () => {
            const auth = new Auth(mockService)
            const returnValue = auth.logout()

            expect(requestMock).toHaveBeenLastCalledWith("authentication/signout", "get", null, true)
            expect(returnValue).toBe("return")
        })
    })
})
