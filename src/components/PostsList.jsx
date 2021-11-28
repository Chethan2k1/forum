// Parent component that Lists all posts

import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PostsListView from './PostsListView'
import ErrorMessage from './Error';

const theme = createTheme({
    palette: {
        primary: {
            dark: '#D3D3D3',
            main: '#A9A9A9'
        }
    }
});

const PostsLists = ({ isloggedin }) => {
    const [error, setError] = useState('')
    const [posts, setPosts] = useState([])
    
    // REST call to fetch all posts
    const fetchPosts = async () => {
        const postsResults = await fetch(`https://forum-backend.azurewebsites.net/posts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const content = await postsResults.json()
        if (content.error != null) setError(content.error)
        else setPosts(content)
    }

    // keeping the dependency list empty to make sure that the fetchPosts is called everytime this component is rendered
    useEffect(async () => {
        await fetchPosts()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md" color="primary">
                <CssBaseline />
                {(error != '') ? <ErrorMessage msg={error} /> : <div></div>}
                <PostsListView
                    posts={posts}
                    setError={setError}
                    isloggedin={isloggedin}
                    showButtons={false}
                />
            </Container>
        </ThemeProvider>
    );
}

export default PostsLists