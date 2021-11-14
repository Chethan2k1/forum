import * as React from 'react';
import { Button, CssBaseline, Grid, TextField, Link } from '@mui/material'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import ErrorMessage from './Error'
import "react-mde/lib/styles/css/react-mde-all.css";
import "./style.css";
import { Navigate } from 'react-router';

const theme = createTheme();
const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

const CreatePost = ({ username }) => {
    const [body, setBody] = React.useState("**Hello world!!!**");
    const [title, setTitle] = React.useState("");
    const [selectedTab, setSelectedTab] = React.useState("write");
    const [error, setError] = React.useState(false);
    const [postid, setPostid] = React.useState('');
    const [redirect, setRedirect] = React.useState(false)

    const onSubmit = async () => {
        if (title == '' || body == '') {
            setError('All fields must be filled!')
            return;
        };

        const createPostResult = await fetch('http://localhost:4000/createpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // hard coding category for now
            body: JSON.stringify({
                username,
                category: 'MATH',
                postHeading: title,
                postContent: body
            })
        })

        const response = await createPostResult.json();
        if (response.error != null) setError(response.error)
        else {
            setPostid(response.postid)
            setRedirect(true)
        }
    }

    if (redirect) return <Navigate to={`/post/${postid}`} />
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md" color="primary">
                <CssBaseline />
                <Grid container
                    // align="center"
                    alignItems="center"
                    justify="center"
                    direction="column">
                    <Grid item container alignItems="center" justify="flex-end" style={{
                        width: 600,
                        borderRadius: 10,
                        margin: 5,
                    }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            name="title"
                            value={title}
                            onChange={(event) => {
                                console.log(event.target.value)
                                setTitle(event.target.value)
                            }}
                            autoComplete="title"
                            autoFocus
                            style={{ width: '100%', marginTop: 5 }} placeholder="Title" />
                    </Grid>
                    <Grid
                        item container
                        alignItems="center"
                        style={{
                            width: 600,
                            borderRadius: 10,
                            margin: 5,
                        }}>
                        <Grid item style={{ width: '100%' }}>
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
                        {(error != null) ? <ErrorMessage msg={error} /> : <div></div>}
                        <Grid container spacing={1} justifyContent="flex-end">
                            <Grid item>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={onSubmit}
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Post
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    type="submit"
                                    component={Link}
                                    to="/"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Discard
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider >
    );
}

export default CreatePost