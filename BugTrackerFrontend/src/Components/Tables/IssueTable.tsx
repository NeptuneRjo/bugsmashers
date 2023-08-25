import React, { useState } from 'react';
import { Issue } from '../../types';
import { search } from '../../utils';
import "../../Styles/IssueTable.css"

function IssueTable({ issues }: { issues: Issue[] }) {

    const [searchParams] = useState<string[]>(["title"])
    const [query, setQuery] = useState<string>("")


    return (
        <div id="issues">
            <div id="issues-tools">
                <input
                    type="search"
                    placeholder="Find an issue"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>
            <div id="issues-grid">
                {search(issues, searchParams, query).map((issue, key) => (
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