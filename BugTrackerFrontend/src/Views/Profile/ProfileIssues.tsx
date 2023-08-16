import React, { useState, useEffect } from 'react';
import { instance } from "../../APIs/Issues"
import { Issue, Label, Priority, Status } from '../../types';
import { getEnumValueByIndex } from '../../utils';
function ProfileIssues({ poster }: { poster: string | undefined }) {

    const [loading, setLoading] = useState<boolean>(true)
    const [issues, setIssues] = useState<Issue[]>([])

    useEffect(() => {
        ; (async () => {
            const response = await instance.getProfile()

            if (response.ok && response.data !== undefined) {
                setIssues(response.data)
                setLoading(false)
            }
        })()
    }, [])

    return (
        <table>
            <tr>
                <th>Title</th>
                <th>Comments</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Label</th>
            </tr>
            {issues.map((issue, key) => (
                <tr key={key}>
                    <td>{issue.title}</td>
                    <td>{issue.comments.length}</td>
                    <td>{getEnumValueByIndex(Status, Number(issue?.status))}</td>
                    <td>{getEnumValueByIndex(Priority, Number(issue?.priority))}</td>
                    <td>{getEnumValueByIndex(Label, Number(issue?.label))}</td>
                    <td><a href={`/issue/${issue.id}`}>Details</a></td>
                </tr>
            ))}
        </table>
    )
}

export default ProfileIssues;