import * as React from 'react';
import { Button, Grid, TextField, Menu, MenuItem } from '@mui/material'

const CategoryDropDown = ({ setError, category, setCategory }) => {
    const [keyword, setKeyword] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [categories, setCategories] = React.useState([]);

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const onClick = (event) => {
        setCategory(event.target.id);
        setAnchorEl(null);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setCategory(keyword)
            setAnchorEl(null)
        }
    }

    const getCategories = async () => {
        const categoriesResults = await fetch(`http://localhost:4000/getcategories?keyword=${keyword}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const catbody = await categoriesResults.json();

        if (catbody.error != null) setError(catbody.error)
        else setCategories(catbody);
    }

    React.useEffect(async () => {
        await getCategories();
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
                {(category == '') ? "category" : `c/${category}`}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => {
                    setCategory(keyword)
                    setAnchorEl(null)
                }}
                onKeyDown={handleKeyDown}
            >
                <TextField value={keyword} onChange={handleChange} label="Category" style={{ margin: 1 }}></TextField>
                {
                    categories.map(({ name, categoryid }) => {
                        return (
                            <MenuItem key={categoryid} id={name} onClick={onClick}> {`c/${name}`} </MenuItem>
                        )
                    })
                }
            </Menu>
        </Grid>
    );
}

export default CategoryDropDown;