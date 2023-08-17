import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom"
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
    EditProject
} from './Views/exports';
import { Navbar } from "./Containers/exports"

function App() {
    const [poster, setPoster] = useState<string | undefined>(undefined)

    useEffect(() => {
        ; (async () => {
            const baseURL = process.env.REACT_APP_BASE_URL
            const url = `${baseURL ? baseURL : "https://localhost:7104/"}user`

            const options: RequestInit = {
                method: "GET",
                credentials: "include"
            }

            const response = await fetch(url, options)

            if (response.ok) {
                const json = await response.json()
                setPoster(json.Name)
            }
        })()
    }, [])

  return (
    <div className="app">
            <Navbar poster={ poster } />
            <Routes>
                <Route path="/dashboard" element={<Home />} />

                <Route path="/profile/projects" element={<ProfileProjects />} />
                <Route path="/profile/issues" element={<ProfileIssues />} />

                <Route path="/project/new-project" element={<CreateProject poster={poster} />} />
              <Route path="/project/:id/edit" element={<EditProject />} />
                <Route path="/project/:id/new-issue" element={<CreateIssue poster={poster} /> } />
                <Route path="/project/:id" element={<ProjectDetails />} />

                <Route path="/issue/:id/edit" element={<EditIssue />} />     
                <Route path="/issue/:id" element={<IssueDetails poster={poster} />} />
            </Routes>
    </div>
  );
}

export default App;
