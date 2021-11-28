// Component creates a Drop Down List of Usernames
import * as React from 'react';
import { Button, Grid, TextField, Menu, MenuItem } from '@mui/material'

const UsernameDropDown = ({ setError, username, setUsername }) => {
    const [keyword, setKeyword] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [users, setUsers] = React.useState([]);

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const onClick = (event) => {
        setUsername(event.target.id);
        setAnchorEl(null);
    }

    const getUsers = async () => {
        const usersResults = await fetch(`https://forum-backend.azurewebsites.net/getusers?keyword=${keyword}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const userResp = await usersResults.json();

        if (userResp.error != null) setError(userResp.error)
        else setUsers(userResp);
    }

    React.useEffect(async () => {
        await getUsers();
    }, [keyword])

    const handleChange = (event) => {
        setKeyword(event.target.value);
    }

    return (
        <Grid container spacing={1} justifyContent="center" style={{ width: '50%' }}>
            <Button
                type="submit"
                variant="contained"
                onClick={openMenu}
                sx={{ mt: 3, mb: 2, marginLeft: 1 }}
            >
                {(username == '') ? "username" : `u/${username}`}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={onClick}
            >
                <TextField value={keyword} onChange={handleChange} label="Username" style={{ margin: 1 }}></TextField>
                {
                    users.map(({ username, userid }) => {
                        return (
                            <MenuItem key={userid} id={username} onClick={onClick}> {`c/${username}`} </MenuItem>
                        )
                    })
                }
            </Menu>
        </Grid>
    );
}

export default UsernameDropDown;