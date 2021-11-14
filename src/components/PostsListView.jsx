import * as React from 'react';
import { Grid, Typography, TextField } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Navigate } from 'react-router-dom';
import getTime from '../utils/time';

const PostsListView = ({ posts }) => {
    const [redirectCreatePost, setRedirectCreatePost] = React.useState(false)

    if (redirectCreatePost) return (<Navigate to='createPost' />)
    return (
        <Grid container
            align="center"
            alignItems="center"
            justify="center"
            direction="column">
            <Grid item container alignItems="center" justify="flex-end" style={{
                width: 600,
                borderRadius: 10,
                margin: 5,
            }}>
                <div onClick={() => { "Redirect button" }}>
                    <AddCircleIcon style={{ margin: 5 }} size='large' onClick={() => setRedirectCreatePost(true)} />
                </div>
                <TextField style={{ width: 550, margin: 5 }} placeholder="Create Post" onFocus={() => setRedirectCreatePost(true)} />
            </Grid>
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
                                backgroundColor: '#D3D3D3',
                                '&:hover': {
                                    backgroundColor: '#A9A9A9',
                                    opacity: [0.9, 0.8, 0.7],
                                },
                            }}>
                            <Grid container direction="column">
                                <Grid item container justify="flex-end">
                                    <Grid item style={{ marginTop: 5, marginLeft: 20 }}> <b>{`c/${category}`}</b> </Grid>
                                    <Grid item style={{ marginTop: 5, marginLeft: 5 }}> {`  posted by u/${username}  ${getTime(createdAt)}`} </Grid>
                                </Grid>
                            </Grid>
                            <Grid item container alignItems="center" align="left">
                                <Typography variant="h6" style={{ width: 600, marginLeft: 20, marginRight: 20 }}>{postHeading}</Typography>
                            </Grid>
                        </Grid>

                    )
                })
            }
        </Grid>
    )
}

export default PostsListView;