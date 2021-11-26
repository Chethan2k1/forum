import * as React from 'react'
import { CssBaseline, Grid, Typography } from '@mui/material'
import Container from '@mui/material/Container';
import ErrorMessage from './Error';
import PostsListsView from './PostsListView';
import CommentsListView from './CommentsListView';

const Modcontrol = ({ token }) => {
    const [error, setError] = React.useState('')
    const [reported, setReported] = React.useState({ posts: [], comments: [] })

    const fetchReported = async () => {
        const reportedResponse = await fetch('http://localhost:4000/reported', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const reported = await reportedResponse.json()
        if (reported.error != null) setError(reported.error)
        else {
            setReported(reported)
        }
    }

    const setPosts = (posts) => {
        setReported({
            posts,
            comments: reported.comments
        })
    }

    const setComments = (comments) => {
        setReported({
            posts: reported.posts,
            comments
        })
    }

    React.useEffect(fetchReported, [])

    return (
        <Container component="main" maxWidth="md" color="primary">
            <CssBaseline />
            {(error != '') ? (<ErrorMessage msg={error} />) : (<div></div>)}
            <Grid container
                align="center"
                alignItems="center"
                justify="center"
                direction="column"
            >
                <Typography variant="h5"> Reported Posts </Typography>
                <PostsListsView
                    token={token}
                    posts={reported.posts}
                    setPosts={setPosts}
                    setError={setError}
                    isloggedin={false}
                    showButtons={true}
                />
                <Typography variant="h5"> Reported Comments </Typography>
                <CommentsListView
                    token={token}
                    comments={reported.comments}
                    setComments={setComments}
                    setError={setError}
                    isloggedin={false}
                    showButtons={true}
                />
            </Grid>
        </Container>
    );
}

export default Modcontrol;