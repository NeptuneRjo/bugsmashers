import React, { useState, useEffect } from 'react';
import Service, { ServiceError } from '../../APIs/apiService';
import { IssueTable, Loader } from '../../Components/exports';
import { Issue } from '../../types';
function ProfileIssues({ service }: { service: Service }) {

    const [loading, setLoading] = useState<boolean>(true)
    const [issues, setIssues] = useState<Issue[]>([])

    const [error, setError] = useState<unknown | null>(null)

    useEffect(() => {
        //; (async () => {
        //    const response = await instance.getProfile()

        //    if (response.ok && typeof response.data !== "string") {
        //        setIssues(response.data!)
        //        setLoading(false)
        //    }
        //})()
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