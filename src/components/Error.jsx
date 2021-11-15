import React from 'react'
import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography';

const ErrorMessage = ({ msg }) => {
    return (
        <Grid item xs={12} style={{ margin: 5 }}>
            <Typography align='center' color="red">
                {msg}
            </Typography>
        </Grid>
    )
}

export default ErrorMessage