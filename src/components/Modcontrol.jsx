// parent component that has mod control features

import * as React from 'react'
import { CssBaseline, Grid, Typography } from '@mui/material'
import Container from '@mui/material/Container';
import ErrorMessage from './Error';
import PostsListsView from './PostsListView';
import CommentsListView from './CommentsListView';

const Modcontrol = ({ token }) => {
    const [error, setError] = React.useState('')
    const [reported, setReported] = React.useState({ posts: [], comments: [] })

    // fetch reported psots and comments
    const fetchReported = async () => {
        const reportedResponse = await fetch(`https://forum-backend.azurewebsites.net/reported`, {
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

    // helper function to change the state of posts used by children of this component thereby rendering parent component
    const setPosts = (posts) => {
        setReported({
            posts,
            comments: reported.comments
        })
    }

    // helper function to change the state of comments used by children of this component thereby rendering parent component
    const setComments = (comments) => {
        setReported({
            posts: reported.posts,
            comments
        })
    }

    // change in any state will get all reported posts and comments
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
                <hr />
                {(reported.posts.length == 0) ?
                    (<Typography variant="h7"> --- No Reported Posts --- </Typography>)
                    : (<PostsListsView
                        token={token}
                        posts={reported.posts}
                        setPosts={setPosts}
                        setError={setError}
                        isloggedin={false}
                        showButtons={true}
                    />)
                }
                <hr />
                <Typography variant="h5"> Reported Comments </Typography>
                <hr
                    style={{
                        color: 'black',
                        backgroundColor: 'black',
                        height: 5
                    }}
                />
                {(reported.comments.length == 0) ?
                    (<Typography variant="h7"> --- No Reported Comments --- </Typography>)
                    : (<CommentsListView
                        token={token}
                        comments={reported.comments}
                        setComments={setComments}
                        setError={setError}
                        isloggedin={false}
                        showButtons={true}
                    />)}
            </Grid>
        </Container>
    );
}

export default Modcontrol;