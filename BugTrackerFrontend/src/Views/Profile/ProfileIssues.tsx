import React, { useState, useEffect } from 'react';
import { instance } from "../../APIs/Issues"
import { IssueTable, Loader } from '../../Components/exports';
import { Issue } from '../../types';
function ProfileIssues() {

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

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <IssueTable issues={issues} />
    )
}

export default ProfileIssues;