import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { getUserDetails } from './API/authRequests';
import './App.css';
import Dashboard from './views/Dashboard';
import Navbar from './views/Navbar';

function App() {
    const navigate = useNavigate()

    const [user, setUser] = useState<string | null>(null)

    useEffect(() => {
        navigate("/dashboard")

        ; (async () => {
            const fetchedUser = await getUserDetails()

            setUser(fetchedUser)
        })()
    }, [])

    return (
        <div className="app">
            <Navbar user={user} setUser={setUser} />
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
    </div>
    )
}

export default App;
