import * as React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles, createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const useStyles = makeStyles(theme => ({
    title: {
        color: 'white',
        flexGrow: 1,
        textDecoration: 'none'
    },
    username: {
        color: 'white',
        textDecoration: 'none'
    }
}));

const theme = createTheme({
    overrides: {
        MuiButton: {
            raisedPrimary: {
                color: 'white',
            },
        },
    }
});

const Navbar = ({ username }) => {
    const classes = useStyles();

    const Rightbar = ({ username }) => {
        if (username != '') {
            return (
                <Typography component={Link} to={`/about/${username}`} className={classes.username}>
                    {`u/${username}`}
                </Typography>
            )
        } else {
            return (
                <div>
                    <Button component={Link} to="/login" color="inherit">
                        Sign In
                    </Button>
                    <Button component={Link} to="/register" color="inherit">
                        Sign Up
                    </Button>
                </div>
            )
        }
    }

    return (
        <MuiThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title}>
                        Forum
                    </Typography>
                    <Rightbar username={username} />
                </Toolbar>
            </AppBar>
        </MuiThemeProvider>
    );
};

export default Navbar;