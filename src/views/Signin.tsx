import { Avatar, Box, Button, Grid, TextField, Typography } from "../components";
import { useAppContext } from "../Context";
import logo from '../assets/img/logo.png';
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../services/authentication";
import { useState } from "react";
import { handleChange } from "../utils/core";

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const { showSnackMessage, showAlertMessage, supabase, translate } = useAppContext();
    const [data, setData] = useState({
        email: {
            value: "",
            error: null,
            helperText: null
        },
        password: {
            value: "",
            error: null,
            helperText: null
        },
    })

    const verifyLogin = async () => {
        let hasError = false;

        if (!data.email.value) {
            setData((prev) => ({
                ...prev,
                email: {
                    ...prev.email,
                    error: true,
                    helperText: translate('message-email-required'),
                },
            }));
            showSnackMessage(translate('message-email-required'));
            hasError = true;
        }

        if (!data.password.value) {
            setData((prev) => ({
                ...prev,
                password: {
                    ...prev.password,
                    error: true,
                    helperText: translate('message-password-required'),
                },
            }));
            showSnackMessage(translate('message-password-required'));
            hasError = true;
        }
        if (hasError) return;

            let { data: response, error } = await signIn(data.email.value, data.password.value, supabase);
        
            

        if (error && error.message === "Invalid login credentials"){
            showSnackMessage(translate('invalid-credentials'));
        } else {
            localStorage.setItem("session", JSON.stringify(response.session));
            localStorage.setItem("user", JSON.stringify(response.user));
            navigate("/");
        }
    }

    return  <Box
                sx={{
                    height: '100vh',
                    paddingTop: 8
                }}
            >
                <Grid 
                    sx={styles.boxAdjustment}
                    container={true}>
                    <Grid 
                        sx={styles.centerBox}
                        item={true} size={{xs: 12}}>
                        <Avatar
                            sx={{ width: 180, height: 180 }}
                            src={logo}
                        />
                    </Grid>
                    <Grid 
                        sx={{
                            ...styles.centerBox,
                            ...styles.marginTop
                        }}
                        item={true} size={{xs: 12}}>
                        <Typography variant="h3">{translate('login')}</Typography>
                    </Grid>
                    <Grid 
                        sx={styles.centerBox}
                        item={true} size={{xs: 12}}>
                        <Typography variant="h5">{translate('welcome')}</Typography>
                    </Grid>
                    <Grid 
                        sx={styles.marginTop}
                        item={true} size={{xs: 12}}>
                        <TextField
                            label={translate('email')}
                            fullWidth={true}
                            onChange={(event) => handleChange(data, setData, event.target.value, "email")}
                            value={data.email.value}
                        />
                    </Grid>
                    <Grid 
                        sx={styles.marginTop}
                        item={true} size={{xs: 12}}>
                        <TextField
                            label={translate('password')}
                            fullWidth={true}
                            onChange={(event) => handleChange(data, setData, event.target.value, "password")}
                            type="password"
                            value={data.password.value}
                        />
                    </Grid>
                    <Grid 
                        sx={{
                            ...styles.centerBox,
                            ...styles.marginTop
                        }}
                        item={true} size={{xs: 12}}>
                        <Link to="/signup">{translate('sign-up')}</Link>
                    </Grid>
                    <Grid 
                        sx={styles.marginTop}
                        item={true} size={{xs: 12}}>
                        <Button 
                            fullWidth={true}
                            onClick={verifyLogin}>{translate('login')}</Button>
                    </Grid>
                </Grid>
            </Box>
};

const styles = {
    centerBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxAdjustment: {
        padding: 2
    },
    marginTop: {
        marginTop: 4
    }
}

export default SignIn;