import React, { useEffect, useState } from 'react';
import { getProviders, signOut } from '../API/authRequests';
import { Provider } from '../typings';

import "./styling/navbar.css";

function Navbar({ user, setUser }: { user: string | null, setUser: React.Dispatch<React.SetStateAction<string | null>> }) {

    const [providers, setProviders] = useState<Provider[]>([])
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            const response = await getProviders()

            if (response === null) {
                setError(true)
                return
            }

            setProviders(response)
        })()
    }, [])

    const handleSignout = async () => {
        try {
            await signOut()
        } catch (e) {
            setError(true)
        }

        setUser(null)
    }

    return (
        <nav className="navbar">
            <h2 className="brand"><a href="/dashboard">Bug Smashers</a></h2>

            <ul className="navigation">
                {user ? (
                    <>
                        <li >
                            <a href={`/user/${user}`}>View Profile</a>
                        </li>
                        <li onClick={() => handleSignout()}>
                            Sign out
                        </li>
                    </>
                ) : (
                    providers?.map((provider: Provider) => (
                        <li>
                            <form action="https://localhost:7104/signin" method="post">
                                <input type="hidden" name="Provider" value={provider.Name} />
                                <button className="login" type="submit">Connect using {provider.DisplayName}</button>
                            </form>
                        </li>
                    ))
                )}
            </ul>

        </nav>
    );
}

export default Navbar;