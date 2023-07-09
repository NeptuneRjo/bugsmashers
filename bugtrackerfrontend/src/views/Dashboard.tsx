import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getIssues } from "../API/issueRequests";
import { CleansedIssue, Issue, LabelType, PriorityType, StatusType } from "../typings";

import "./styling/dashboard.css"

export const cleanseIssues = (items: Issue[]): CleansedIssue[] => {
    const labels: string[] = Object.values(LabelType)
    const priorities: string[] = Object.values(PriorityType)
    const statuses: string[] = Object.values(StatusType)

    let cleansedIssues: CleansedIssue[] = []

    items.forEach((item) => {
        const newItem = {
            ...item,
            status: statuses[item.status],
            label: labels[item.label],
            priority: priorities[item.priority]
        }

        cleansedIssues.push(newItem)
    })

    return cleansedIssues
}

function Dashboard() {

    const [issues, setIssues] = useState<CleansedIssue[]>([])
    const [error, setError] = useState<boolean>(false)


    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const response = await getIssues();

            if (response === null) {
                setError(true)
                return
            }

            setIssues(cleanseIssues(response))
            console.log(cleanseIssues(response))
        })()
    }, [])


    return (
        <div className="dashboard">
            <div>
                <table className="table">
                    <tr className="table-head">
                        <th>Id</th>
                        <th>Issue</th>
                        <th>Status</th>
                        <th>Priority</th>
                    </tr>
                    {issues.length < 0 ? (
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
    )
}

export default Dashboard;