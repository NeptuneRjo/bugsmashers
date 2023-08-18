import React from 'react';
import { Issue } from '../../types';

function IssueTable({ issues }: { issues: Issue[] }) {

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
                    <td>{issue?.status}</td>
                    <td>{issue?.priority}</td>
                    <td>{issue?.label}</td>
                    <td><a href={`/project/${issue.project_id}/issue/${issue.id}`}>Details</a></td>
                </tr>
            ))}
        </table>
    )
}

export default IssueTable;