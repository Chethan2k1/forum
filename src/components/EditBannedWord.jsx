// The parent Component which is used for Add/Remove Banned Words

import * as React from 'react';
import { Grid, Container, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BannedWordDropDown from './BannedWordDropDown'

const EditBannedWord = ({ token, setError, setSuccess }) => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [bannedWord, setBannedWord] = React.useState('')

    // REST call to add Banned Word
    const AddBannedWordHandler = async () => {
        if (bannedWord == '') {
            setError("Enter word!")
            return
        }

        const addbannedwordresp = await fetch(`https://forum-backend.azurewebsites.net/createbannedword`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                word: bannedWord
            })
        })

        const resp = await addbannedwordresp.json()
        if (resp.error != null) {
            setError(resp.error)
            setSuccess('')
        } else {
            setError('')
            setSuccess(`Successfully added "${bannedWord}" to banned words!`)
        }
    }

    // REST call to remove Banned Word
    const RemoveBannedWordHandler = async () => {
        if (bannedWord == '') {
            setError("Enter word!")
            return
        }

        const removebannedwordResp = await fetch(`https://forum-backend.azurewebsites.net/removebannedword`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                word: bannedWord
            })
        })

        const resp = await removebannedwordResp.json()
        if (resp.error != null) {
            setError(resp.error)
            setSuccess('')
        } else {
            setError('')
            setSuccess(`Removed "${bannedWord}" from banned words!`)
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
                    Add/Remove Banned Word
                </Typography>
                <BannedWordDropDown
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    setError={setError}
                    bannedWord={bannedWord}
                    setBannedWord={setBannedWord}
                />
            </Grid>
            <Grid container justifyContent="center">
                <Button
                    startIcon={<AddIcon />}
                    style={{ color: '#FF0000' }}
                    onClick={AddBannedWordHandler}
                >
                    Add
                </Button>
                <Button
                    startIcon={<RemoveIcon />}
                    style={{ color: '#000000' }}
                    onClick={RemoveBannedWordHandler}
                >
                    Remove
                </Button>
            </Grid>
        </Container>
    )
}

export default EditBannedWord;