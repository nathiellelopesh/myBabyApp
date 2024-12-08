import { useNavigate, useParams } from "react-router-dom";
import { AppBar, Box, Button, Grid, Typography, DateTimePicker, TextField} from "../components";
import { useAppContext } from "../Context";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButtonComponent from "../components/iconbutton";
import { useTheme } from "@mui/material/styles";
import {signOut} from '../services/authentication';
import { useState, useEffect } from "react";
import { list, save, update } from "../services/supabase";
import { handleInputChange } from "../utils/action";
import { adjustDateTimeForTimezone } from "../utils/core";

const Settings = () => {
    const {translate, showAlertMessage, supabase, changeLanguage} = useAppContext();
    const [data, setData] = useState([])

    const navigate = useNavigate()
    const theme = useTheme()

    const params = useParams();
    const id = params.id

    const loadData = async() => {
            const result = await list("baby_description");
            console.log(result)
            setData(result[0]) 
    }

    useEffect(() => {
        loadData();
    }, [])

    const LogoutButton = async() => {
        try {
            await signOut(supabase);
            showAlertMessage(translate("logout-sucess"), 'success');
            supabase.auth.onAuthStateChange((event) => {
                console.log("Evento de autenticação:", event);
            });
            navigate('/signin')
            window.location.href = '/signin'
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
            showAlertMessage(translate("something-went-wrong"), "error");
        }
    }

    const handleLanguage = (language) => {
        const storeLanguage = localStorage.getItem('language');
        if(storeLanguage === language) {
            return 'contained';
        }
        return 'outlined';
    }

    const saveAction = async() => {
        console.log(data)
        try{           
            if(!data.name || !data.birth) {
                showAlertMessage(translate("field-start-date-required"), "error")
                showAlertMessage(translate("field-type-required"), "error")
            } else {
                await update("baby_description", data, id);
                showAlertMessage(translate("form-saved"), "success");
                navigate("/");
            }
        } catch(err){
            showAlertMessage(translate("something-went-wrong") + err, "error");
        }
    }

    return <Grid>
        <AppBar title={translate('settings')} />

        <Box sx={{...styles.IdiomBox, gap: '15px'}}>
            <Button
                onClick={() => changeLanguage('en')}
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
                {translate('english')}
            </Button>

            <Button
                variant="contained"
                onClick={() => changeLanguage('pt')}
                sx={{mt: 3, mb: 2}}
            >
                {translate('portuguese')}
            </Button>

            <Button
                variant="contained"
                onClick={() => changeLanguage('es')}
                sx={{mt: 3, mb: 2}}
            >
                {translate('spanish')}
            </Button>
        </Box>

        <Grid container={true} sx={{width: '75%', margin: 'auto'}}>
            <Grid item={true} size={{xs: 12}}>
                <DateTimePicker
                    value={data?.birth ? adjustDateTimeForTimezone(data?.birth) : null}
                    label={translate("birth")}
                    name="birth"
                    fullWidth={true}
                    ampm={false}
                    format="DD/MM/YYYY HH:mm"
                    onChange={(value) => {handleInputChange('birth', new Date(value.toString()), data, setData)}}
                />
            </Grid>
            <Grid item={true} size={{xs: 12}} sx={{marginTop: '10px'}}>
                <TextField
                    value={data?.name ? data.name : ""}
                    label={translate("name")}
                    onChange={(event) => {handleInputChange('name', event.target.value, data, setData)}}
                    name="name"
                    fullWidth={true}
                />
            </Grid>
            <Grid item={true} size={{xs: 12}} sx={{marginTop: '10px'}}>
                <TextField
                    value={data?.weight ? data.weight : ""}
                    label={translate("weight")}
                    onChange={(event) => {handleInputChange('weight', event.target.value, data, setData)}}
                    name="weight"
                    fullWidth={true}
                />
            </Grid>
            <Grid item={true} size={{xs: 12}} sx={{marginTop: '10px'}}>
                <TextField
                    value={data?.height ? data.height : ""}
                    label={translate("height")}
                    onChange={(event) => {handleInputChange('height', event.target.value, data, setData)}}
                    name="height"
                    fullWidth={true}
                />
            </Grid>
            <Grid item={true} size={{xs: 12}} sx={{marginTop: '10px'}}>
                <Button
                    type='submit'
                    fullWidth
                    variant="contained"
                    onClick={saveAction}
                    sx={{mt: 3, mb: 2}}
                >
                    {translate('save')}
                </Button>
            </Grid>
        </Grid>

        <Box sx={{...styles.logout}}>
            <Typography sx={{color: `${theme.palette.primary.main}`}}>{translate('logout')}</Typography>
            <IconButtonComponent
                onClick={LogoutButton}
                sx={{
                    ...styles.iconButton,
                    border: `2px solid ${theme.palette.primary.main}`
                }}
            >
                <ExitToAppIcon sx={{...styles.icon, color: `${theme.palette.primary.main}`}}/>
            </IconButtonComponent>
        </Box>
    </Grid>
};

const styles = {
    icon: {
        fontSize: '1.5em'
    },
    iconButton: {
        height: '2.5em',
        width: '2.5em',
    },
    logout: {
        position: 'absolute',
        bottom: 0,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    IdiomBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export default Settings;