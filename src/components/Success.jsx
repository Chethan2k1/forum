// A Component to display a message in Green

import React from 'react'
import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography';

const SuccessMessage = ({ msg }) => {
    return (
        <Grid item xs={12} style={{ margin: 5 }}>
            <Typography align='center' color="green">
                {msg}
            </Typography>
        </Grid>
    )
}

export default SuccessMessage