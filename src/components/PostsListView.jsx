// Child component of PostsList which creates the ListView for posts 

import * as React from 'react';
import { Grid, Typography, TextField, Button } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Navigate, Link } from 'react-router-dom';
import getTime from '../utils/time';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const PostsListView = ({ token, posts, setError, isloggedin, showButtons, setPosts }) => {
    const [redirectCreatePost, setRedirectCreatePost] = React.useState(false)
    // state that holds filtered posts
    const [filteredposts, setFilteredPosts] = React.useState([])
    const [keyword, setKeyword] = React.useState('')

    const onChangeHandler = async (event) => {
        setKeyword(event.target.value)
    }

    // Search Feature
    // Search doesn't make rest call just filters posts state with keyword
    React.useEffect(() => {
        if (keyword != '') setFilteredPosts(posts.filter((post) => { return post.postHeading.toUpperCase().startsWith(keyword.toUpperCase()) }))
        else setFilteredPosts(posts)
    }, [keyword, posts])

    // REST call to remove a post (only admin)
    const deleteHandler = async (postid) => {
        const deleteResp = await fetch(`https://forum-backend.azurewebsites.net/removepost`, {
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

    // REST call to unreport post (only admin)
    const unreportHandler = async (postid) => {
        const unreportResp = await fetch(`https://forum-backend.azurewebsites.net/unreport`, {
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

    // onClicking on the textfield redirects to /createPost
    if (redirectCreatePost) return (<Navigate to='createPost' />)
    return (
        <Grid container item>
            <Grid container item
                align="center"
                alignItems="center"
                justify="center"
                direction="column"
            >
                {
                    (isloggedin) ? (<Grid item container alignItems="center" justify="flex-end" style={{
                        width: '70%',
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
                <TextField
                    placeholder="Search"
                    variant="filled"
                    style={{ width: '70%', marginTop: 10 }}
                    onChange={onChangeHandler}
                />
                {
                    filteredposts.map(({ category, username, postHeading, createdAt, postid }) => {
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
                                <Link to={`/post/${postid}`} style={{ textDecoration: 'none', color: 'black' }}>
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