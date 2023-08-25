import React, { useState, useEffect, useContext } from 'react';
import { ServiceContext } from '../../App';
import { IssueTable, Loader } from '../../Components/exports';
import { Issue, ServiceContextType } from '../../types';
function ProfileIssues() {

    const [loading, setLoading] = useState<boolean>(true)
    const [issues, setIssues] = useState<Issue[]>([])

    const [error, setError] = useState<unknown | null>(null)

    const { service } = useContext(ServiceContext) as ServiceContextType

    useEffect(() => {
        service.issues.list(true)
            .then((response: Issue[]) => {
                setIssues(response)
                setLoading(false)
            })
            .catch((err: unknown) => {
                setError(err)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <Loader />
        )
    }

    if (error !== null) {
        return (
            <div>error</div>
        )
    }

    return (
        <IssueTable issues={issues} />
    )
}

export default ProfileIssues;