import React from 'react';
import { Issue, Label, Priority, Status } from '../../types';
import { getEnumValueByIndex } from '../../utils';

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
                    <td>{getEnumValueByIndex(Status, Number(issue?.status))}</td>
                    <td>{getEnumValueByIndex(Priority, Number(issue?.priority))}</td>
                    <td>{getEnumValueByIndex(Label, Number(issue?.label))}</td>
                    <td><a href={`/issue/${issue.id}`}>Details</a></td>
                </tr>
            ))}
        </table>
    )
}

export default IssueTable;