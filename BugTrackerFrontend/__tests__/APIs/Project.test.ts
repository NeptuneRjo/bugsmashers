import Projects from "../../src/APIs/Projects"
import { IIssueModel, Label, Priority, Project, Status } from "../../types"

const unmockedFetch = global.fetch

const mockFetch = async (data: object | string, status: number = 200) => {
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

const MOCK_PROJECT: Project = {
    id: 1,
    title: "test",
    issues: [],
    created_at: new Date(),
    poster: "test"
}

const MOCK_ISSUE: IIssueModel = {
    title: "test",
    description: "test",
    solved: false,
    status: Status.backlog,
    label: Label.bug,
    priority: Priority.low
}

describe("Project API Tests", () => {
    const projects = new Projects("")

    afterEach(() => {
        global.fetch = unmockedFetch
    })

    test("passes", () => {
        expect("hello").toEqual("hello")
    })

    test("Projects.getAll returns data and 200 OK", async () => {
        mockFetch([MOCK_PROJECT])

        const response = await projects.getAll()

        expect(response.data).toEqual([MOCK_PROJECT])
        expect(response.status).toEqual(200)
        expect(response.status).not.toEqual(400)
    })

    test("Projects.getAll returns error and 400 BAD REQUEST", async () => {
        mockFetch("Error", 400)

        const response = await projects.getAll()

        expect(response.data).toEqual("Error")
        expect(response.status).toEqual(400)
        expect(response.status).not.toEqual(200)
    })

    test("Projects.get returns data and 200 OK", async () => {
        mockFetch(MOCK_PROJECT)

        const response = await projects.get(1)

        expect(response.data).toEqual(MOCK_PROJECT)
        expect(response.status).toEqual(200)
        expect(response.status).not.toEqual(400)
    })

    test("Projects.get returns error and 400 BAD REQUEST", async () => {
        mockFetch("Error", 400)

        const response = await projects.get(1)

        expect(response.data).toEqual("Error")
        expect(response.status).toEqual(400)
        expect(response.status).not.toEqual(200)
    })

    test("Projects.create returns data and 200 OK", async () => {
        mockFetch(MOCK_PROJECT)

        const response = await projects.create(MOCK_PROJECT)

        expect(response.data).toEqual(MOCK_PROJECT)
        expect(response.status).toEqual(200)
        expect(response.status).not.toEqual(400)
    })

    test("Projects.create returns error and 400 BAD REQUEST", async () => {
        mockFetch("Error", 400)

        const response = await projects.create(MOCK_PROJECT)

        expect(response.data).toEqual("Error")
        expect(response.status).toEqual(400)
        expect(response.status).not.toEqual(200)
    })

    test("Projects.update returns data and 200 OK", async () => {
        mockFetch(MOCK_PROJECT)

        const response = await projects.update(1, { title: "test" })

        expect(response.data).toEqual(MOCK_PROJECT)
        expect(response.status).toEqual(200)
        expect(response.status).not.toEqual(400)
    })

    test("Projects.update returns error and 400 BAD REQUEST", async () => {
        mockFetch("Error", 400)

        const response = await projects.update(1, { title: "test" })

        expect(response.data).toEqual("Error")
        expect(response.status).toEqual(400)
        expect(response.status).not.toEqual(200)
    })

    test("Projects.delete returns data and 200 OK", async () => {
        mockFetch(MOCK_PROJECT)

        const response = await projects.delete(1)

        expect(response.data).toEqual(MOCK_PROJECT)
        expect(response.status).toEqual(200)
        expect(response.status).not.toEqual(400)
    })

    test("Projects.delete returns error and 400 BAD REQUEST", async () => {
        mockFetch("Error", 400)

        const response = await projects.delete(1)

        expect(response.data).toEqual("Error")
        expect(response.status).toEqual(400)
        expect(response.status).not.toEqual(200)
    })

    test("Projects.add returns data and 200 OK", async () => {
        mockFetch(MOCK_PROJECT)

        const response = await projects.add(1, MOCK_ISSUE)

        expect(response.data).toEqual(MOCK_PROJECT)
        expect(response.status).toEqual(200)
        expect(response.status).not.toEqual(400)
    })

    test("Projects.add returns error and 400 BAD REQUEST", async () => {
        mockFetch("Error", 400)

        const response = await projects.add(1, MOCK_ISSUE)

        expect(response.data).toEqual("Error")
        expect(response.status).toEqual(400)
        expect(response.status).not.toEqual(200)
    })
})

