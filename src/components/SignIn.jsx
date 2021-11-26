import * as React from 'react';
import { Button, CssBaseline, TextField, Link, Grid, Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SHA_256 from '../utils/crypto'
import { Navigate } from 'react-router-dom'
import ErrorMessage from './Error'

const theme = createTheme();

export default function SignIn({setUsername, setPoints, setIsloggedin, setToken, setIsmod, setIsadmin}) {
  // error state
  const [error, setError] = React.useState(null)
  const [redirect, setRedirect] = React.useState(false)

  const PostLoginDetails = async (email, password) => {
    const loginResp = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const content = await loginResp.json();
    if (content.error != null) setError(content.error)
    else { 
      setRedirect(true)
      setUsername(content.username)
      setPoints(content.bbpoints)
      setIsloggedin(true) // setting it as logged in
      setToken(content.token)
      // if the mod_categories has no categories then the user is not a moderator
      if(content.mod_categories.length != 0) setIsmod(true)
      setIsadmin(content.isadmin)
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // check if email is valid and email and password are not empty
    // convert the password to somekind of hash to store in the DB
    const email = data.get('email'), pass = data.get('password')
    if (email == '' || pass == '') setError("Fill in all details!")
    else await PostLoginDetails(email, SHA_256(pass));
  };

  if (redirect) return <Navigate to='/' />
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {(error != null) ? <ErrorMessage msg={error} /> : <div></div>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}