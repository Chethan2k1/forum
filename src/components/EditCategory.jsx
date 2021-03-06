// The parent Component which is used for Add/Remove Category

import * as React from 'react';
import { Grid, Container, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CategoryDropDown from './CategoryDropDown'

const EditCategory = ({ token, setError, setSuccess }) => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [category, setCategory] = React.useState('')

    // REST call to add Category
    const AddCategoryHandler = async () => {
        if (category == '') {
            setError("Name the Category!")
            return
        }

        const addcatresp = await fetch(`https://forum-backend.azurewebsites.net/createcat`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: category
            })
        })

        const resp = await addcatresp.json()
        if (resp.error != null) { 
            setError(resp.error)
            setSuccess('')
        } else {
            setError('')
            setSuccess(`Successfully added ${category}!`)
        }
    }

    // REST call to remove Category
    const RemoveCategoryHandler = async () => {
        if (category == '') {
            setError("Name the Category!")
            return
        }

        const removecatResp = await fetch(`https://forum-backend.azurewebsites.net/removecat`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: category
            })
        })

        const resp = await removecatResp.json()
        if (resp.error != null) { 
            setError(resp.error)
            setSuccess('')
        } else { 
            setError('')
            setSuccess(`Successfully removed ${category}!`)
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
                    Add/Remove Category
                </Typography>
                <CategoryDropDown
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    setError={setError}
                    category={category}
                    setCategory={setCategory}
                />
            </Grid>
            <Grid container justifyContent="center">
                <Button
                    startIcon={<AddIcon />}
                    style={{ color: '#FF0000' }}
                    onClick={AddCategoryHandler}
                >
                    Add
                </Button>
                <Button
                    startIcon={<RemoveIcon />}
                    style={{ color: '#000000' }}
                    onClick={RemoveCategoryHandler}
                >
                    Remove
                </Button>
            </Grid>
        </Container>
    )
}

export default EditCategory;