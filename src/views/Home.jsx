import { Avatar, Box, IconButton, Typography, CustomList } from "../components";
import GridComponent from "../components/grid";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import baby from '../assets/img/baby.png'
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { ACTIONS } from "../constants/actions";
import CardNewItem from "../components/custom/cardNewItem";
import { useEffect, useState } from "react";
import { get, list } from "../services/supabase";
import { useAppContext } from "../Context";

const Home = () => {
    const [data, setData] = useState([]);
    const [babyData, setBabyData] = useState([]);
    const [daysBirth, setDaysBirth] = useState(null)

    const { translate } = useAppContext()

    const navigate = useNavigate();
    const theme = useTheme()

    //pra carregar do supabase
    const loadData = async () => {
        const d = await list("item")
        if(d){
            setData(d)
        } else {
            console.log('não foi possivel carregar lista')
        }
    }

    useEffect(() => {
        loadData()
        loadBabyData()
    }, [])

    const loadBabyData = async () => {
        const baby = await list("baby_description");
        //console.log(baby)
        //console.log(baby[0].birth) // 2024-12-03T03:00:00

        if(baby){
            setBabyData(baby[0]);

            const birth = new Date(baby[0].birth);
            const today = new Date();

            const differenceInTime = today - birth;
            const daysBaby = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
            setDaysBirth(daysBaby)
            //console.log(`O bebê tem ${daysBaby} dias.`);

        } else {
            console.log('não foi possivel carregar informações do bebê')
        }
    }

    return (
        <>
            <GridComponent container={true}
                sx={{height: '25vh'}}
            >
                <GridComponent item={true} size={{xs: 12}} sx={{marginTop: '1em'}}>
                    <GridComponent container={true}>
                        <GridComponent item={true} size={{xs: 4}} sx={{...styles.centerBox}}>
                            <IconButton
                                onClick={() => navigate('/dashboard')}
                                sx={{
                                    ...styles.iconButton,
                                    border: `2px solid ${theme.palette.primary.main}`
                                }}
                            >
                                <SignalCellularAltIcon sx={{...styles.icon, color: `${theme.palette.primary.main}`}}/>
                            </IconButton>
                            <Box>
                                <Typography sx={{...styles.centerText, ...styles.text2}}>{babyData.height} cm</Typography>
                                <Typography sx={{...styles.centerText, ...styles.text3}}>{translate('height')}</Typography>
                            </Box>
                        </GridComponent>
                        <GridComponent item={true} size={{xs: 4}}  sx={{...styles.centerBox}}>
                            <Avatar src={baby} sx={{width: 90, height: 90}}/>
                            <Box sx={styles.boxText}>
                                <Typography sx={{...styles.centerText, ...styles.text1}}>{babyData.name}</Typography>
                                <Typography sx={{...styles.centerText, ...styles.text3}}>{daysBirth} {translate('days')}</Typography>
                            </Box>
                        </GridComponent>
                        <GridComponent item={true} size={{xs: 4}}  sx={{...styles.centerBox}}>
                            <IconButton
                                onClick={() => navigate('/settings')}
                                sx={{
                                    ...styles.iconButton,
                                    border: `2px solid ${theme.palette.primary.main}`
                                }}
                            >
                                <SettingsIcon  sx={{...styles.icon, color: `${theme.palette.primary.main}`}}/>
                            </IconButton>
                            
                            <Box>
                                <Typography sx={{...styles.centerText, ...styles.text2}}>{babyData.weight} kg</Typography>
                                <Typography sx={{...styles.centerText, ...styles.text3}}>{translate('weight')}</Typography>
                            </Box>
                        </GridComponent>
                    </GridComponent>
                </GridComponent>
                <GridComponent item={true} size={{xs: 12}}
                    sx={{position: 'relative', bottom: '-8px'}}
                >
                    <GridComponent container={true}>
                        {
                            ACTIONS.map((action, idx) => {
                                return <GridComponent sx={{padding: '16px'}} key={idx} size={{xs: 4}}>
                                    <CardNewItem {...action}/>
                                </GridComponent>
                            })
                        }
                        
                    </GridComponent>
                </GridComponent>
            </GridComponent>
            
            <GridComponent container={true}
                sx={{
                    height: '75vh',
                    paddingTop: '60px',
                    backgroundColor: theme.palette.primary.main,
                }}
            >
                <GridComponent item={true} size={{xs: 12}}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        height: '55vh',
                        marginTop: '150px',
                        overflow: 'auto',
                    }}
                >
                    { data ? <CustomList
                                sx={{
                                    overflow: 'auto',
                                    maxHeight: '56.5vh'
                                }}
                                items={data}
                            /> : null}
                </GridComponent>
            </GridComponent>
        </>
    )
    
};

const styles = {
    centerBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    iconButton: {
        height: '2.5em',
        width: '2.5em',
    },
    icon: {
        fontSize: '1.5em'
    },
    centerText: {
        textAlign: 'center'
    },
    boxText: {
        marginTop: '.5em'
    },
    text1: {
        wordBreak: 'break-all',
        fontSize: '1.2em',
        fontWeight: '500',
        fontFamily: '"Lato", sans-serif'
    },
    text2: {
        wordBreak: 'break-all',
        fontSize: '.8em',
        fontWeight: '600',
        fontFamily: '"Lato", sans-serif'
    },
    text3: {
        wordBreak: 'break-all',
        fontSize: '.8em',
        fontWeight: '400',
        fontFamily: '"Lato", sans-serif'
    }
}

export default Home;
