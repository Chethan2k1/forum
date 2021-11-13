import * as React from 'react';
import { CssBaseline, Typography } from '@mui/material'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom'

const theme = createTheme();

const ShowPost = () => {
    const { postid } = useParams()

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Typography> {`Should Display a post with id ${postid}`} </Typography>
            </Container>
        </ThemeProvider>
    );
}

export default ShowPost