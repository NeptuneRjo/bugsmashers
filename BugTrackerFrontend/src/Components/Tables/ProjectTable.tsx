import React, { useState } from 'react';
import { Project } from '../../types';
import "../../Styles/ProjectTable.css"
import moment from 'moment';
import { search } from '../../utils';

function ProjectTable({ projects }: { projects: Project[] }) {

    const [searchParams] = useState<string[]>(["title"])
    const [query, setQuery] = useState<string>("")

    return (
        <div id="projects">
            <div id="projects-tools">
                <input
                    type="search"
                    placeholder="Find a project"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>
            <div id="projects-grid">
                {search(projects, searchParams, query).map((project, key) => (
                    <div key={key} id="project">
                        <a href={`/project/${project.id}`}>{project.title}</a>
                        <p>{project.issues.length} Issues</p>
                        <span>Opened {moment(project.created_at).fromNow()} by {project.poster}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProjectTable;