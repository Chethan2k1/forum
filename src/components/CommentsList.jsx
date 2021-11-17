import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid, Button } from '@mui/material'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommentsListView from './CommentsListView'
import ErrorMessage from './Error';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./style.css";

const theme = createTheme({
    palette: {
        primary: {
            dark: '#D3D3D3',
            main: '#A9A9A9'
        }
    }
});

const CommentsList = ({ isloggedin, postid, token }) => {
    const [error, setError] = useState('')
    const [comments, setComments] = useState([])
    const [body, setBody] = React.useState("**Hello world!!!**");
    const [selectedTab, setSelectedTab] = React.useState("write");
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    const fetchComments = async () => {
        const commentsResults = await fetch(`http://localhost:4000/getcomments?postid=${postid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const content = await commentsResults.json()
        if (content.error != null) setError(content.error)
        else setComments(content)
    }

    const postComment = async () => {
        const commResults = await fetch(`http://localhost:4000/createcomment`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ppostid: postid,
                content: body
            })
        })

        const response = await commResults.json();
        if (response.error != null) setError(response.error);
        else fetchComments();
    }

    // keeping the dependency list empty to make sure that the fetchComments is called everytime this component is rendered
    useEffect(async () => {
        await fetchComments()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md" color="primary">
                <CssBaseline />
                {(error != '') ? <ErrorMessage msg={error} /> : <div></div>}
                <Grid container
                    align="center"
                    alignItems="center"
                    justify="center"
                    direction="column"
                >
                    <Grid
                        item container
                        alignItems="center"
                        style={{
                            width: 600,
                            borderRadius: 10,
                            margin: 5,
                        }}>
                        <Grid item style={{ width: '100%', minHeight: 50 }}>
                            <ReactMde
                                value={body}
                                onChange={setBody}
                                selectedTab={selectedTab}
                                onTabChange={setSelectedTab}
                                generateMarkdownPreview={markdown =>
                                    Promise.resolve(converter.makeHtml(markdown))
                                }
                                childProps={{
                                    writeButton: {
                                        tabIndex: -1
                                    }
                                }}
                            />
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={postComment}
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Post
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <CommentsListView comments={comments} setError={setError} isloggedin={isloggedin} />
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default CommentsList