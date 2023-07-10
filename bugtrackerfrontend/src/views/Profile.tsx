import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserIssues } from '../API/issueRequests';
import { Issue } from '../typings';

import "./styling/profile.css";

function Profile({ user }: { user: string | null }) {
    const navigate = useNavigate()
    let { id } = useParams()

    const [issues, setIssues] = useState<Issue[]>([])
    const [issueError, setIssueError] = useState<boolean>(false)

    useEffect(() => {
        ; (async () => {
            if (id !== user) navigate("/dashboard")

            if (user !== null) {
                const userIssues = await getUserIssues(user)

                if (userIssues === null) return setIssueError(true)

                setIssues(userIssues)
            }
        })()
    }, [user])

    return (
        <div className="profile">
            <div>
                <h2>My Issues</h2>
                <table className="table">
                    <tr className="table-head">
                        <th>Id</th>
                        <th>Issue</th>
                        <th>Status</th>
                        <th>Priority</th>
                    </tr>
                    {issues.length > 0 ? (
                        issues.map((issue) => (
                            <tr className="table-content" onClick={() => navigate(`/issues/${issue.id}`)}>
                                <td>
                                    <div className="id">{issue.id}</div></td>
                                <td>
                                    <div className="title">
                                        <div className="label">{issue.label}</div>
                                        <span>{issue.title}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="status">{issue.status}</div>
                                </td>
                                <td>
                                    <div className="priority">{issue.priority}</div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="table-none">
                            <td>No issues to display right now...</td>
                        </tr>
                    )}
                </table>
            </div>
        </div>
    );
}

export default Profile;