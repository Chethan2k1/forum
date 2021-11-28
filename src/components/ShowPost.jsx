// Component that shows single post

import * as React from 'react';
import { CssBaseline, Grid, Typography } from '@mui/material'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom'
import getTime from '../utils/time';
import ErrorMessage from './Error';
import ReactMarkdown from 'react-markdown'
import CommentsList from './CommentsList'
import MyHorizonatalLine from './Markdown/HorizontalLine'
import MyImageTag from './Markdown/Image'
import ReportIcon from '@mui/icons-material/Report';

const theme = createTheme();

const ShowPost = ({ token, isloggedin }) => {
    const { postid } = useParams()
    const [post, setPost] = React.useState({})
    const [error, setError] = React.useState('')

    // REST call to get details of the current post
    const fetchPost = async () => {
        const postResults = await fetch(`https://forum-backend.azurewebsites.net/post/?postid=${postid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const content = await postResults.json()
        // Check for status 404 
        if (content.error != null) setError(content.error)
        else {
            setPost(content)
        }
    }

    // REST call to report a post
    const postReport = async () => {
        const reportResp = await fetch(`https://forum-backend.azurewebsites.net/report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify({
                reportedid: postid,
                category: post.category,
                ispost: true
            })
        })

        const report = await reportResp.json()
        if(report.error != null) setError(report.error)
    }

    // Side-Effect that is called everytime there is a change in any state
    React.useEffect(async () => {
        await fetchPost();
    }, [])

    if (error) return <ErrorMessage msg={error} />
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md" color="primary">
                <CssBaseline />
                <Grid container
                    align="center"
                    alignItems="center"
                    direction="column">
                    <Grid
                        item container
                        alignItems="center"
                        style={{
                            width: 600,
                            borderRadius: 10,
                            margin: 5,
                            backgroundColor: '#D3D3D3',
                        }}>
                        <Grid container direction="column">
                            <Grid item container justify="flex-end">
                                <Grid item style={{ marginTop: 5, marginLeft: 20 }}> <b>{`c/${post.category}`}</b> </Grid>
                                <Grid item style={{ marginTop: 5, marginLeft: 5 }}> {`  posted by u/${post.username}  ${getTime(post.createdAt)}`} </Grid>
                                <Grid item justify="flex-start" style={{ marginTop: 5, marginLeft: 5 }}>
                                    <ReportIcon style={{ cursor: 'pointer' }} onClick={postReport} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container alignItems="center" align="left" style={{ width: 600, marginLeft: 20, marginRight: 20 }}>
                            <Typography variant="h6">{post.postHeading}</Typography>
                        </Grid>
                        <Grid align="left" style={{ width: 600, marginLeft: 20, marginRight: 20 }}>
                            <ReactMarkdown
                                children={post.postContent}
                                components={{
                                    hr: MyHorizonatalLine,
                                    img: MyImageTag
                                }} />
                        </Grid>
                    </Grid>
                </Grid>
                <CommentsList 
                    category={post.category}
                    postid={postid} 
                    token={token} 
                />
            </Container>
        </ThemeProvider>
    );
}

export default ShowPost