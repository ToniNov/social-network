import React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {getCaptchaUrl} from "../../redux/users-selectors";
import {login} from "../../redux/auth-reducer";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


export type StatePasswordStatusType = {
    password: string
    showPassword: boolean
}

export default function LoginFormik() {

    const dispatch = useDispatch()
    const captchaUrl = useSelector(getCaptchaUrl)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
            captcha: null
        },
        validate: (values) => {
            const errors: any = {};
            if (!values.email) {
                errors.email = "Required";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length < 4) {
                errors.password = "Must be 4 characters or less";
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(login(values.email, values.password, values.rememberMe, values.captcha));
            formik.resetForm();
        },
    });

    const [value, setValue] = useState<StatePasswordStatusType>({
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValue({
            ...value,
            showPassword: !value.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{mt: 1}}>
            <FormControl>
                <FormGroup>
                    <TextField
                        type="email"
                        label="Email"
                        margin="normal"
                        {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div style={{color: "red", fontStyle: "10px"}}>{formik.errors.email}</div>
                    ) : null}

                    <TextField
                        margin="normal"
                        label="Password"
                        autoComplete="current-password"
                        type={value.showPassword ? 'text' : 'password'}
                        {...formik.getFieldProps("password")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}>
                                        {value.showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div style={{color: "red"}}>{formik.errors.password}</div>
                    ) : null}

                    <FormControlLabel
                        label={"Remember me"}
                        control={<Checkbox  {...formik.getFieldProps("rememberMe")} />}
                    />

                    {captchaUrl && <>
                        <img src={captchaUrl} alt={'captchaUrl'}/>
                        <TextField
                            label="Captcha"
                            id="captcha"
                            name="captcha"
                            onChange={formik.handleChange}/>
                    </>}

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>

                    <Card>
                        <div>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </div>
                        <div>or use common test account credentials:</div>
                        <div>Email: free@samuraijs.com</div>
                        <div>Password: free</div>
                    </Card>
                </FormGroup>
            </FormControl>
        </Box>
    );
}