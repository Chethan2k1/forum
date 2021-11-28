// Component which is used as DropDown for Banned Words with Search feature
import * as React from 'react';
import { Button, Grid, TextField, Menu, MenuItem } from '@mui/material'

const BannedWordDropDown = ({ setError, bannedWord, setBannedWord }) => {
    const [keyword, setKeyword] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [bannedWords, setBannedWords] = React.useState([]);

    // Opens the Menu
    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const onClick = (event) => {
        setBannedWord(event.target.id);
        setAnchorEl(null);
    }

    // Allows "Enter" event to be considered as select option
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setBannedWord(keyword)
            setAnchorEl(null)
        }
    }

    // gets all banned words
    const getBannedWords = async () => {
        const bannedWordsResults = await fetch(`https://forum-backend.azurewebsites.net/getbannedwords?keyword=${keyword}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const bannedWords = await bannedWordsResults.json();

        if (bannedWords.error != null) setError(bannedWords.error)
        else setBannedWords(bannedWords);
    }

    // reload the banned words everytime there is a change in keyword
    React.useEffect(async () => {
        await getBannedWords();
    }, [keyword])

    const handleChange = (event) => {
        setKeyword(event.target.value.toUpperCase());
    }

    return (
        <Grid container spacing={1} justifyContent="center" style={{ width: '50%' }}>
            <Button
                type="submit"
                variant="contained"
                onClick={openMenu}
                sx={{ mt: 3, mb: 2, marginLeft: 1 }}
            >
                {(bannedWord == '') ? "banned word" : `${bannedWord}`}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => {
                    setBannedWord(keyword)
                    setAnchorEl(null)
                }}
                onKeyDown={handleKeyDown}
            >
                <TextField value={keyword} onChange={handleChange} label="Banned Word" style={{ margin: 1 }}></TextField>
                {
                    bannedWords.map(({ word }) => {
                        return (
                            <MenuItem key={word} id={word} onClick={onClick}> {word} </MenuItem>
                        )
                    })
                }
            </Menu>
        </Grid>
    );
}

export default BannedWordDropDown;