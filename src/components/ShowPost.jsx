import * as React from 'react';
import { CssBaseline, Grid, Typography, Button } from '@mui/material'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom'
import getTime from '../utils/time';
import ErrorMessage from './Error';
import ReactMarkdown from 'react-markdown'
import CommentsList from './CommentsList'
import MyHorizonatalLine from './Markdown/HorizontalLine'
import MyImageTag from './Markdown/Image'

const theme = createTheme();

const ShowPost = ({ token, isloggedin }) => {
    const { postid } = useParams()
    const [post, setPost] = React.useState({})
    const [error, setError] = React.useState('')

    const fetchPost = async () => {
        const postResults = await fetch(`http://localhost:4000/post/?postid=${postid}`, {
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

    console.log(token)

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
                <CommentsList postid={postid} token={token} />
            </Container>
        </ThemeProvider>
    );
}

export default ShowPost