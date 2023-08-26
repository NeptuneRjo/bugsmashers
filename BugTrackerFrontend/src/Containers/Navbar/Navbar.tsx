import React, { useContext, useEffect, useState } from 'react';
import { ServiceContext } from '../../App';
import "../../Styles/NavbarContainer.css"
import { ServiceContextType } from '../../types';

type Provider = {
    name: string
    display_name: string
}

function Navbar() {
    let url: string

    const DEVELOPMENT = process.env.REACT_APP_DEVELOPMENT
    const API_URL = process.env.REACT_APP_API_URL

    if (
        DEVELOPMENT !== undefined &&
        DEVELOPMENT === "true"
    ) {
        url = "https://localhost:7104"
    } else if (API_URL !== undefined) {
        url = API_URL
    } else {
        throw new Error("Set REACT_APP_DEVELOPMENT to true or provide REACT_APP_API_URL")
    }

    const [providers, setProviders] = useState<Provider[]>([])
    const [error, setError] = useState<unknown | null>(null)

    const { service, poster, updatePoster } = useContext(ServiceContext) as ServiceContextType

    useEffect(() => {
        service.auth.list()
            .then((response: Provider[]) => {
                setProviders(response)
            })
            .catch((err: unknown) => {
                setError(err)
            })
    }, [])

    const handleSignout = async () => {
        service.auth.logout()
            .then(() => {
                updatePoster(null)
            })
            .catch((err: unknown) => {
                setError(err)
            })
    }

    return (
        <nav id="nav">
            <h1><a href="/">Bug Smashers</a></h1>
            {poster === null ? (
                <div id="nav-content">
                    <a href="/">Projects</a>
                    {providers.map((provider, key) => (
                        <form action={`${url}/api/authentication/signin`} method="post" key={key}>
                            <input type="hidden" name="Provider" value={provider.name} />
                            <input type="hidden" name="RedirectURI" value={""} />
                            <button type="submit">Connect using {provider.display_name}</button>
                        </form>
                    ))}
                </div>
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