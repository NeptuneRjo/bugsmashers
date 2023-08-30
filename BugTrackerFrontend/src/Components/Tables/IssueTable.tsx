import React, { useEffect, useState } from 'react';
import { Issue, Label, Priority, Status } from '../../types';
import { search } from '../../utils';
import "../../Styles/IssueTable.css"

function IssueTable({ issues }: { issues: Issue[] }) {

    const [issuesRef, setIssuesRef] = useState<Issue[]>([...issues])

    const [searchParams] = useState<string[]>(["title"])
    const [query, setQuery] = useState<string>("")

    const [status, setStatus] = useState<string>("")
    const [label, setLabel] = useState<string>("")
    const [priority, setPriority] = useState<string>("")

    useEffect(() => {
        let ref = [...issues]

        ref = search(ref, ["status"], status)
        ref = search(ref, ["label"], label)
        ref = search(ref, ["priority"], priority)

        setIssuesRef(ref)
    }, [status, priority, label])

    return (
        <div id="issues">
            <div id="issues-tools">
                <input
                    type="search"
                    placeholder="Find an issue"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <div>
                    <label htmlFor="status">Status</label>
                    <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">All</option>
                        {Object.values(Status).map((value, key) => (
                            <option key={key} value={value}>{value}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="label">Label</label>
                    <select name="label" value={label} onChange={(e) => setLabel(e.target.value)}>
                        <option value="">All</option>
                        {Object.values(Label).map((value, key) => (
                            <option key={key} value={value}>{value}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="priority">Priority</label>
                    <select name="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="">All</option>
                        {Object.values(Priority).map((value, key) => (
                            <option key={key} value={value}>{value}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div id="issues-grid">
                {search(issuesRef, searchParams, query).map((issue, key) => (
                    <div key={key} id="issue">
                        <a href={`/project/${issue.project_id}/issue/${issue.id}`}>{issue.title}</a>
                        <ul>
                            <li id="label">{issue.label}</li>
                            <li>Status: {issue.status}</li>
                            <li>Priority: {issue.priority}</li>
                        </ul>
                        <span>Opened by {issue.poster}</span>
                    </div>
                )) }
            </div>
        </div>
    )
}

export default IssueTable;