import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserDetails } from '../API/authRequests';
import { getUserComments, getUserIssues } from '../API/issueRequests';
import { Issue, Comment } from '../typings';

function Profile() {
    const navigate = useNavigate()
    let { id } = useParams()

    const [user, setUser] = useState<string | null>(null)
    const [issues, setIssues] = useState<Issue[]>([])
    const [comments, setComments] = useState<Comment[]>([])
    const [issueError, setIssueError] = useState<boolean>(false)
    const [commentError, setCommentError] = useState<boolean>(false)

    useEffect(() => {
        ; (async () => {
            const fetchedUser = await getUserDetails()

            if (id !== fetchedUser) navigate("/dashboard")

            setUser(fetchedUser)
        })()
        // The user's issues are rendered by default so they're fetched on page load
        // Comments are fetched by handleGetComments() to prevent uneccessary API calls
        ; (async () => {
            const userIssues = await getUserIssues()

            if (userIssues === null) return setIssueError(true)

            setIssues(userIssues)
        })()
    }, [])

    const handleGetComments = async () => {
        const userComments = await getUserComments()

        if (userComments === null) return setCommentError(true)

        setComments(userComments)
    }
    
    return (
        <div></div>
    );
}

export default Profile;