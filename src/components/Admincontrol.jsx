// Main page for Admin Control

import * as React from 'react';
import { Grid, CssBaseline } from '@mui/material'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditCategory from './EditCategory'
import EditModerator from './EditModerator'
import EditBannedWord from './EditBannedWord'
import ErrorMessage from './Error'
import SuccessMessage from './Success'

const theme = createTheme();

const Admincontrol = ({ token }) => {
    // error and success state for components in AdminControl
    const [error, setError] = React.useState('')
    const [success, setSuccess] = React.useState('')

    return (
        <ThemeProvider theme={theme}>
            <Grid container style={{ width: '100%' }} justifyContent="center">
                <CssBaseline />
                <ErrorMessage msg={error} />
                <SuccessMessage msg={success} />  
                <Grid container style={{ marginTop: 20 }} justifyContent="center" direction="column">           
                    <EditCategory 
                        token={token}
                        error={error}
                        setError={setError}
                        success={success}
                        setSuccess={setSuccess} 
                    />
                    <EditModerator 
                        token={token}
                        error={error}
                        setError={setError}
                        success={success}
                        setSuccess={setSuccess} 
                    />
                    <EditBannedWord 
                        token={token} 
                        error={error}
                        setError={setError}
                        success={success}
                        setSuccess={setSuccess}
                    />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Admincontrol;