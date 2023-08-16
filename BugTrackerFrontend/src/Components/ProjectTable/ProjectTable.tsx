import React from 'react';
import { Project } from '../../types';

function ProjectTable({ projects }: { projects: Project[] }) {
    return (
        <table>
            <tr>
                <th>Title</th>
                <th>Issues</th>
                <th>Created At</th>
            </tr>
            {projects.map((project, key) => (
                <tr key={key}>
                    <td>{project.title}</td>
                    <td>{project.issues.length}</td>
                    <td>{project.created_at.split("T")[0]}</td>
                    <td><a href={`/project/${project.id}`}>Details</a></td>
                </tr>
            ))}
        </table>
    )
}

export default ProjectTable;