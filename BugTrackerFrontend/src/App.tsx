import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import './App.css';
import {
    Home,
    ProfileProjects,
    ProfileIssues,
    IssueDetails,
    ProjectDetails,
    CreateProject,
    CreateIssue,
    EditIssue,
    EditProject,
    NotFound
} from './Views/exports';
import { Navbar } from "./Containers/exports"
import Service from './Services/apiService';
import { ServiceContextType, User } from "./types"

export const ServiceContext = React.createContext<ServiceContextType | null>(null)

function App() {
    const [poster, setPoster] = useState<string | null>(window.sessionStorage.getItem("poster"))
    const [error, setError] = useState<unknown | null>(null)

    const service = new Service("https://localhost:7104/")

    useEffect(() => {
        const sessionPoster = window.sessionStorage.getItem("poster")

        if (sessionPoster === null) {
            service.auth.retrieve()
                .then((response: User) => {
                    setPoster(response.Name)
                    window.sessionStorage.setItem("poster", response.Name)
                })
                .catch((err: unknown) => {
                    setError(err)
                })
        } else {
            setPoster(sessionPoster)
        }
    }, [])

    const updatePoster = (update: string | null) => {
        setPoster(update)

        if (update === null) {
            window.sessionStorage.removeItem("poster")
        } else {
            window.sessionStorage.setItem("poster", update)
        }
    }

    return (
        <div className="app">
            <ServiceContext.Provider value={{ service, poster, updatePoster }}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    {poster !== null
                        ? (
                            <>
                                <Route path="/new-project" element={<CreateProject />} />

                                <Route path="/project/:projId/edit" element={<EditProject />} />
                                <Route path="/project/:projId/new" element={<CreateIssue />} />
                                <Route path="/project/:projId/issue/:issueId/edit" element={<EditIssue />} />

                                <Route path="/profile/projects" element={<ProfileProjects />} />
                                <Route path="/profile/issues" element={<ProfileIssues />} />
                            </>
                        )
                        : <Route element={<Navigate to="/" />} />
                    }

                    <Route path="/project/:projId" element={<ProjectDetails />} />
                    <Route path="/project/:projId/issue/:issueId" element={<IssueDetails />} />
                    <Route path="/not-found" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ServiceContext.Provider>
        </div>
    );
}

export default App;
