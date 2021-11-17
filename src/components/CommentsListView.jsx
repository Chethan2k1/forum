import * as React from 'react';
import getTime from '../utils/time';
import { Grid } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import MyHorizonatalLine from './Markdown/HorizontalLine'
import MyImageTag from './Markdown/Image'

const PostsListView = ({ comments, setError }) => {
    return (
        <>
            {
                comments.map(({ username, content, createdAt, commentid }) => {
                    return (
                        <Grid
                            key={commentid}
                            item container
                            alignItems="center"
                            style={{
                                width: 600,
                                borderRadius: 10,
                                margin: 5,
                                backgroundColor: '#D3D3D3'
                            }}>
                            <Grid container direction="column">
                                <Grid item container justify="flex-end">
                                    <Grid item style={{ marginTop: 5, marginLeft: 20, marginRight: 20 }}> {`  posted by u/${username}  ${getTime(createdAt)}`} </Grid>
                                </Grid>
                            </Grid>
                            <Grid align="left" style={{ width: 600, marginLeft: 20, marginRight: 20 }}>
                                <ReactMarkdown
                                    children={content}
                                    components={{
                                        hr: MyHorizonatalLine,
                                        img: MyImageTag
                                    }} />
                            </Grid>
                        </Grid>
                    )
                })
            }
        </>
    )
}

export default PostsListView;