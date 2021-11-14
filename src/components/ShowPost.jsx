import * as React from 'react';
import { CssBaseline, Grid, Typography } from '@mui/material'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom'
import getTime from '../utils/time';
import ErrorMessage from './Error';
import * as Showdown from "showdown";
import Markdown from 'markdown-to-jsx';

const theme = createTheme();

const MyHorizonatalLine = () => {
    return (
        <div style={{ width: 540 }}>
            <hr />
        </div>
    )
}

const MyImageTag = ({ children, ...props }) => {
    return (
        <img {...props} style={{width: 400}} />
    )
}

const ShowPost = () => {
    const { postid } = useParams()
    const [post, setPost] = React.useState({})
    const [error, setError] = React.useState('')
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

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
                            <myHorizonatalLine />
                            <Grid item container justify="flex-end">
                                <Grid item style={{ marginTop: 5, marginLeft: 20 }}> <b>{`c/${post.category}`}</b> </Grid>
                                <Grid item style={{ marginTop: 5, marginLeft: 5 }}> {`  posted by u/${post.username}  ${getTime(post.createdAt)}`} </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container alignItems="center" align="left" style={{ width: 600, marginLeft: 20, marginRight: 20 }}>
                            <Typography variant="h6">{post.postHeading}</Typography>
                        </Grid>
                        <Grid align="left" style={{ width: 600, marginLeft: 20, marginRight: 20 }}>
                            <Markdown options={{ overrides: { hr: { component: MyHorizonatalLine }, img: { component: MyImageTag } } }} children={post.postContent} />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default ShowPost