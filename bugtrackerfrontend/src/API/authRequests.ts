import { Provider } from "../typings"

const url: string = "https://localhost:7104"
let options: RequestInit = {
    method: 'GET'
}

export const getProviders = async (): Promise<Provider | null> => {
    const response = await fetch(`${url}/signin`, options)

    if (response.ok) {
        const json = await response.json()

        return json
    }

    return null
}

export const signOut = async () => {
    options.credentials = 'include'

    await fetch(`${url}/signout`, options)
}