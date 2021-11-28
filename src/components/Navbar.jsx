import * as React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles, createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, TextField, Grid } from '@mui/material';

const useStyles = makeStyles(theme => ({
    title: {
        color: 'white',
        textDecoration: 'none'
    },
    menuItem: {
        color: 'black',
        textDecoration: 'none'
    },
    username: {
        color: 'white',
        textDecoration: 'none'
    },
    input: {
        color: 'white'
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

const Navbar = ({ username, isloggedin, isadmin, ismod }) => {
    const classes = useStyles();

    const Rightbar = ({ username }) => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const openMenu = (event) => {
            setAnchorEl(event.currentTarget);
        }

        const onClick = () => {
            setAnchorEl(null);
        }

        if (isloggedin) {
            return (
                <>
                    <Typography className={classes.username} onClick={openMenu} styles={{ cursor: 'pointer' }}>
                        {`u/${username}`}
                    </Typography>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={onClick}
                    >
                        {
                            (isadmin) ? (
                                <MenuItem >
                                    <Link to='/admincontrol' className={classes.menuItem}>
                                        Admin Control
                                    </Link>
                                </MenuItem>) : (<div></div>)
                        }
                        {
                            (ismod || isadmin) ? (
                                <MenuItem>
                                    <Link to='/modcontrol' className={classes.menuItem}>
                                        Mod Control
                                    </Link>
                                </MenuItem>) : (<div></div>)
                        }
                        <MenuItem>
                            <a href='/' className={classes.menuItem}>
                                Log Out
                            </a>
                        </MenuItem>
                    </Menu>
                </>
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
                    <Grid container
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Grid item>
                            <Typography component={Link} to="/" variant="h6" className={classes.title}>
                                Forum
                            </Typography>
                        </Grid>
                        <Rightbar username={username} />
                    </Grid>
                </Toolbar>
            </AppBar>
        </MuiThemeProvider>
    );
};

export default Navbar;