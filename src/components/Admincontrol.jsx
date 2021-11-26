import * as React from 'react';
import { Grid, CssBaseline } from '@mui/material'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditCategory from './EditCategory'
import EditModerator from './EditModerator'

const theme = createTheme();

const Admincontrol = ({ token }) => {

    return (
        <ThemeProvider theme={theme}>
            <Grid container style={{ width: '100%' }} justifyContent="center">
                <CssBaseline />
                <Grid container style={{ width: '60%', marginTop: 20 }} justifyContent="center">
                    <EditCategory token={token} />
                    <EditModerator token={token} />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Admincontrol;