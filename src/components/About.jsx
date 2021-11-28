// About page of User [WIP]

import * as React from 'react';
import { CssBaseline } from '@mui/material'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const About = ({username}) => {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
            </Container>
        </ThemeProvider>
    );
}

export default About