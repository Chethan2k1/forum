// The parent Component which is used for Add/Remove Moderator Words

import * as React from 'react';
import { Grid, Container, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CategoryDropDown from './CategoryDropDown'
import UsernameDropDown from './UsernameDropDown'

const EditModerator = ({ token, setError, setSuccess }) => {
    // for edit moderator
    const [username, setUsername] = React.useState('')
    const [cat, setCat] = React.useState('')

    // REST call to add a moderator (Only admin)
    const AddModeratorHandler = async () => {
        if (username == '' || cat == '') {
            setError("Fill all details!")
            return
        }

        const addmodresp = await fetch(`https://forum-backend.azurewebsites.net/createmod`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                username,
                category: cat
            })
        })

        const resp = await addmodresp.json()
        if (resp.error != null) { 
            setError(resp.error)
            setSuccess('')
        } else {
            setError('')
            setSuccess(`Successfully added u/${username} as mod for c/${cat}!`)
        }
    }

    // REST call to remove Moderator (Only admins)
    const RemoveModeratorHandler = async () => {
        if (username == '' || cat == '') {
            setError("Fill all details!")
            return
        }

        const removemodresp = await fetch(`https://forum-backend.azurewebsites.net/removemod`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                username,
                category: cat
            })
        })

        const resp = await removemodresp.json()
        if (resp.error != null) { 
            setError(resp.error)
            setSuccess('')
        } else {
            setError('')
            setSuccess(`Successfully removed u/${username} as mod for c/${cat}!`)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Grid container
                align="center"
                alignItems="center"
                justify="center"
                direction="column"
            >
                <Typography variant="h5">
                    Add/Remove Moderator
                </Typography>
                <UsernameDropDown
                    setError={setError}
                    username={username}
                    setUsername={setUsername}
                />
                <CategoryDropDown
                    setError={setError}
                    category={cat}
                    setCategory={setCat}
                />
            </Grid>
            <Grid container justifyContent="center">
                <Button
                    startIcon={<AddIcon />}
                    style={{ color: '#FF0000' }}
                    onClick={AddModeratorHandler}
                >
                    Add
                </Button>
                <Button
                    startIcon={<RemoveIcon />}
                    style={{ color: '#000000' }}
                    onClick={RemoveModeratorHandler}
                >
                    Remove
                </Button>
            </Grid>
        </Container>
    )
}

export default EditModerator;