import React, { useEffect, useState } from 'react';


function Navbar({ poster }: { poster: string | undefined }) {

    const baseURL = process.env.REACT_APP_BASE_URL
    const url = `${baseURL ? baseURL : "https://localhost:7104/"}signin`

    const [providers, setProviders] = useState<any[]>([])

    useEffect(() => {
        ; (async () => {
            const options: RequestInit = {
                method: "GET"
            }
            const response = await fetch(url, options)

            if (response.ok) {
                const json = await response.json()
                setProviders(json)
            }

        })()
    }, [])

    return (
        <nav>
            <h3><a href="/dashboard">Bug Smashers</a></h3>
            <a href="/dashboard">Projects</a>
            {poster === undefined ? (
                <>
                    {providers.map((provider, key) => (
                        <form action={url} method="post" key={key}>
                            <input type="hidden" name="Provider" value={provider.name} />
                            <button type="submit">Connect using {provider.display_name}</button>
                        </form>
                    ))}
                </>
            ) : (
                <>
                    <a href="/profile/projects">My Projects</a>                
                    <a href="/profile/issues">My Issues</a> 
                    <a href="/project/new-project">Create Project</a>
                </>

            )}
        </nav>
    );
}

export default Navbar;