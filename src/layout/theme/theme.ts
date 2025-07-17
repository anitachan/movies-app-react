// src/theme/theme.ts
import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2'
        },
        secondary: {
            main: '#9c27b0'
        },
        error: {
            main: red.A400
        },
        background: {
            default: '#f5f5f5'
        }
    },
    typography: {
        fontFamily: ['"Poppins"', 'Roboto', 'sans-serif'].join(','),
        h6: {
            fontWeight: 600
        }
    }
})

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9'
        },
        secondary: {
            main: '#ce93d8'
        },
        error: {
            main: red.A400
        },
        background: {
            default: '#121212'
        }
    },
    typography: {
        fontFamily: ['"Poppins"', 'Roboto', 'sans-serif'].join(','),
        h6: {
            fontWeight: 600
        }
    }
})
