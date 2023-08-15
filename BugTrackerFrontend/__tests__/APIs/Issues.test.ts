import Issues from "../../src/APIs/Issues"
import { IssueModel, Label, Priority, Status } from "../../types"

const unmockedFetch = global.fetch

const mockFetch = async (data: object, status: number = 200) => {
    global.fetch = jest
        .fn()
        .mockImplementation(
            jest.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve(data),
                    status,
                    ok: status >= 200 && status < 300
                }),
            ) as jest.Mock
        )
}

const MOCK_ISSUE: IssueModel = {
    title: "test",
    description: "test",
    solved: false,
    status: Status.backlog,
    label: Label.bug,
    priority: Priority.low
}


describe("Issue API Tests", () => {
    const issues = new Issues("")

    afterEach(() => {
        global.fetch = unmockedFetch
    })

    test("passes", () => {
        expect("test").toEqual("test")
    })

    test("Issues.getAll returns data and 200 OK", async () => {
        mockFetch([MOCK_ISSUE])

        const response = await issues.getAll()

        expect(response.data).toEqual([MOCK_ISSUE])
        expect(response.status).toEqual(200)
        expect(response.status).not.toEqual(400)
    })

    test("Issues.getAll returns undefined and 400 BAD REQUEST", async () => {
        mockFetch([MOCK_ISSUE], 400)

        const response = await issues.getAll()

        expect(response.data).toEqual(undefined)
        expect(response.status).toEqual(400)
        expect(response.status).not.toEqual(200)
    })

    test("Issues.get returns data and 200 OK", async () => {
        mockFetch(MOCK_ISSUE)

        const response = await issues.get(1)

        expect(response.data).toEqual(MOCK_ISSUE)
        expect(response.status).toEqual(200)
        expect(response.status).not.toEqual(400)
    })

    test("Issues.get returns undefined and 400 BAD REQUEST", async () => {
        mockFetch(MOCK_ISSUE, 400)

        const response = await issues.get(1)

        expect(response.data).toEqual(undefined)
        expect(response.status).toEqual(400)
        expect(response.status).not.toEqual(200)
    })

    test("Issues.update returns data and 200 OK", async () => {
        mockFetch(MOCK_ISSUE)

        const response = await issues.update(1, MOCK_ISSUE)

        expect(response.data).toEqual(MOCK_ISSUE)
        expect(response.status).toEqual(200)
        expect(response.status).not.toEqual(400)
    })

    test("Issues.update returns undefined and 400 BAD REQUEST", async () => {
        mockFetch(MOCK_ISSUE, 400)

        const response = await issues.update(1, MOCK_ISSUE)

        expect(response.data).toEqual(undefined)
        expect(response.status).toEqual(400)
        expect(response.status).not.toEqual(200)
    })

    test("Issues.delete returns data and 200 OK", async () => {
        mockFetch(MOCK_ISSUE)

        const response = await issues.delete(1)

        expect(response.data).toEqual(MOCK_ISSUE)
        expect(response.status).toEqual(200)
        expect(response.status).not.toEqual(400)
    })

    test("Issues.delete returns undefined and 400 BAD REQUEST", async () => {
        mockFetch(MOCK_ISSUE, 400)

        const response = await issues.delete(1)

        expect(response.data).toEqual(undefined)
        expect(response.status).toEqual(400)
        expect(response.status).not.toEqual(200)
    })

    test("Issues.add returns data and 200 OK", async () => {
        mockFetch(MOCK_ISSUE)

        const response = await issues.add(1, { content: "test" })

        expect(response.data).toEqual(MOCK_ISSUE)
        expect(response.status).toEqual(200)
        expect(response.status).not.toEqual(400)
    })

    test("Issues.add returns undefined and 400 BAD REQUEST", async () => {
        mockFetch(MOCK_ISSUE, 400)

        const response = await issues.add(1, { content: "test" })

        expect(response.data).toEqual(undefined)
        expect(response.status).toEqual(400)
        expect(response.status).not.toEqual(200)
    })
})