import React, { useEffect, useState } from 'react';
import "../../Styles/NavbarContainer.css"

function Navbar({ poster, setPoster }: { poster: string | undefined, setPoster: React.Dispatch<React.SetStateAction<string | undefined>> }) {

    const baseURL = process.env.REACT_APP_BASE_URL
    const url = baseURL ? baseURL : "https://localhost:7104/"

    const [providers, setProviders] = useState<any[]>([])

    useEffect(() => {
        ; (async () => {
            const options: RequestInit = {
                method: "GET"
            }
            const response = await fetch(`${url}signin`, options)

            if (response.ok) {
                const json = await response.json()
                setProviders(json)
            }

        })()
    }, [])

    const handleSignout = async () => {
        const options: RequestInit = {
            method: "GET",
            credentials: "include"
        }

        const response = await fetch(`${url}signout`, options)

        if (response.ok) {
            setPoster(undefined)
        }
    }

    return (
        <nav id="nav">
            <h1><a href="/">Bug Smashers</a></h1>
            {poster === undefined ? (
                <>
                    {providers.map((provider, key) => (
                        <form action={`${url}signin`} method="post" key={key}>
                            <input type="hidden" name="Provider" value={provider.name} />
                            <button type="submit">Connect using {provider.display_name}</button>
                        </form>
                    ))}
                </>
            ) : (
                <div id="nav-content">
                    <a href="/">Projects</a>
                    <a href="/profile/projects">My Projects</a>                
                    <a href="/profile/issues">My Issues</a> 
                    <a href="/new-project">Create Project</a>
                    <button onClick={() => handleSignout()}>Signout</button>
                </div>

            )}
        </nav>
    );
}

export default Navbar;