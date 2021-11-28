// SignUp Component

import * as React from 'react';
import { Button, CssBaseline, TextField, Link, Grid, Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SHA_256 from '../utils/crypto'
import { Navigate } from 'react-router-dom'
import ErrorMessage from './Error'

const theme = createTheme();

export default function SignUp() {
  // the error state 
  const [error, setError] = React.useState(null)
  const [redirect, setRedirect] = React.useState(false)

  // REST call to post Register Details
  const PostRegisterDetails = async (username, email, password) => {
    const registerResp = await fetch(`https://forum-backend.azurewebsites.net/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    })

    const content = await registerResp.json();
    if (content.error != null) setError(content.error)
    else { 
      setRedirect(true) 
    }
  };

  // Basic checks for fields and encrypt the password
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const username = data.get('username'), email = data.get('email'), pass = data.get('password');
    if (username == '' || email == '' || pass == '') setError("Fill in all details!")
    else await PostRegisterDetails(username, email, SHA_256(pass));
  };

  if (redirect) return (<Navigate to='/login' />);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {(error != null) ? <ErrorMessage msg={error} /> : <div></div>}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}