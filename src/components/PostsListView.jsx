import * as React from 'react';
import { Grid, Typography, TextField, Button } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Navigate, Link } from 'react-router-dom';
import getTime from '../utils/time';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const PostsListView = ({ token, posts, setError, isloggedin, showButtons, setPosts }) => {
    const [redirectCreatePost, setRedirectCreatePost] = React.useState(false)

    const deleteHandler = async (postid) => {
        const deleteResp = await fetch('http://localhost:4000/removepost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                postid
            })
        })

        const resp = await deleteResp.json();
        if (resp.error != null) setError(resp.error)
        else {
            console.log('Deleted Successfully!')
        }

        setPosts(posts.filter((post) => {
            return post.postid != postid;
        }))
    }

    const unreportHandler = async (postid) => {
        const unreportResp = await fetch('http://localhost:4000/unreport', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                reportedid: postid,
                ispost: true
            })
        })

        const resp = await unreportResp.json();
        if (resp.error != null) setError(resp.error)
        else {
            console.log('Unreported Successfully!')
        }

        setPosts(posts.filter((post) => {
            return post.postid != postid;
        }))
    }

    if (redirectCreatePost) return (<Navigate to='createPost' />)
    return (
        <Grid container>
            <Grid container item
                align="center"
                alignItems="center"
                justify="center"
                direction="column"
            >
                {
                    (isloggedin) ? (<Grid item container alignItems="center" justify="flex-end" style={{
                        width: 600,
                        borderRadius: 10,
                        margin: 5,
                    }}>
                        <div>
                            <AddCircleIcon style={{ margin: 5 }} size='large' onClick={() => {
                                if (isloggedin)
                                    setRedirectCreatePost(true)
                                else {
                                    setError("Must login to create a post!")
                                }
                            }} />
                        </div>
                        <TextField style={{ width: 550, margin: 5 }} placeholder="Create Post" onFocus={() => {
                            if (isloggedin)
                                setRedirectCreatePost(true)
                            else {
                                setError("Must login to create a post!")
                            }
                        }} />
                    </Grid>) : (<div></div>)
                }
                {
                    posts.map(({ category, username, postHeading, createdAt, postid }) => {
                        return (

                            <Grid
                                key={postid}
                                item container
                                alignItems="center"
                                style={{
                                    width: 600,
                                    borderRadius: 10,
                                    margin: 5,
                                    backgroundColor: '#D3D3D3'
                                }}>
                                <Link to={`post/${postid}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    <Grid container direction="column">
                                        <Grid item container justify="flex-end">
                                            <Grid item style={{ marginTop: 5, marginLeft: 20 }}> <b>{`c/${category}`}</b> </Grid>
                                            <Grid item style={{ marginTop: 5, marginLeft: 5 }}> {`  posted by u/${username}  ${getTime(createdAt)}`} </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item container alignItems="center" align="left">
                                        <Typography variant="h6" style={{ width: 600, marginLeft: 20, marginRight: 20 }}>{postHeading}</Typography>
                                    </Grid>
                                </Link>
                                {
                                    (showButtons) ? (
                                        <Grid container item style={{ marginLeft: 20, marginBottom: 5 }}>
                                            <Button
                                                startIcon={<DeleteIcon />}
                                                style={{ color: '#FF0000' }}
                                                onClick={async () => {
                                                    await deleteHandler(postid);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                startIcon={<RemoveCircleIcon />}
                                                style={{ color: '#000000' }}
                                                onClick={async () => {
                                                    await unreportHandler(postid)
                                                }}
                                            >
                                                Unreport
                                            </Button>
                                        </Grid>
                                    ) : (<div></div>)
                                }
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Grid >
    )
}

export default PostsListView;