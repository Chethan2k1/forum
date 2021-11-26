import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
    overrides: {
        MuiButton: {
            raisedPrimary: {
                color: 'white',
            },
        },
    },
    palette: {
        primary: {
            dark: '#D3D3D3',
            main: '#A9A9A9'
        }
    }
})

export default theme;