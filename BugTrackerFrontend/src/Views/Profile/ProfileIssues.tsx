import React, { useState, useEffect } from 'react';
import { instance } from "../../APIs/Issues"
import { Issue } from '../../types';
function ProfileIssues({ poster }: { poster: string | undefined }) {

    const [loading, setLoading] = useState<boolean>(true)
    const [issues, setIssues] = useState<Issue[]>([])

    useEffect(() => {
        ; (async () => {
            const response = await instance.getAll()

            if (response.ok && response.data !== undefined) {
                const filteredProjects = response.data.filter(project => project.poster === poster)
                setIssues(filteredProjects)
                setLoading(false)
            }
        })()
    }, [])

    return (
        <table>
            <tr>
                <th>Title</th>
                <th>Comments</th>
                <th>Solved</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Label</th>
            </tr>
            {issues.map((issue, key) => (
                <tr key={key}>
                    <td>{issue.title}</td>
                    <td>{issue.comments.length}</td>
                    <td>{issue.solved}</td>
                    <td>{issue.status}</td>
                    <td>{issue.priority}</td>
                    <td>{issue.label}</td>
                    <td><a href={`/issue/${issue.id}`}>Details</a></td>
                </tr>
            ))}
        </table>
    )
}

export default ProfileIssues;