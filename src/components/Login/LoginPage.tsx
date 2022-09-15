import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {getIsAuth} from "../../redux/users-selectors";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LoginFormik from "./LoginFormik";
import {ThemeProvider} from "@mui/material";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {createTheme} from '@mui/material/styles';

const theme = createTheme();

const LoginPage: React.FC = (props) => {

    console.log('Login rend')

    const isAuth = useSelector(getIsAuth)

    if (isAuth) {
        return <Redirect to={"/"}/>
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <LoginFormik/>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default LoginPage;