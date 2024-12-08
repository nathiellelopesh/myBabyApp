import { List, ListItem, ListItemAvatar, Avatar, ListItemText, useTheme } from "@mui/material"
import CribIcon from '@mui/icons-material/Crib'
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu"
import SpaIcon from '@mui/icons-material/Spa'
import { useAppContext } from "../../Context"
import { useNavigate } from "react-router-dom"
import { formatDateTime } from "../../utils/action"

const CustomList = ({items, ...props}) => {
    const navigate = useNavigate()
    const {translate} = useAppContext();
    const theme = useTheme()

    const typeString = {
        1: 'sleep',
        2: 'eat',
        3: 'diaper'
    }

    const typeColor = {
        1: '#4b10a9',
        2: '#47c869',
        3: '#f4cc1d'
    }

    const getIcon = (action_type) => {
        switch(action_type) {
            case 1: return <CribIcon/>
            case 2: return <RestaurantMenuIcon/>
            case 3: return <SpaIcon/>
            default: return <RestaurantMenuIcon/>
        }
    }

    const subtitleSleep = (item) => {
        const duration = 0;
        return formatDateTime(item.start_date);
    }
    const subtitleEat = (item) => {
        return formatDateTime(item.start_date);
    }
    const subtitleDiaper = (item) => {
        return formatDateTime(item.start_date);
    }

    const generateSubtitle = (item) => {
        switch(item.action_type) {
            case 1: return subtitleSleep(item)
            case 2: return subtitleEat(item)
            case 3: return subtitleDiaper(item)
            default: return 'oi'
        }
    }

    return <List {...props}
            sx={{
                paddingLeft: '1em',
                ...props.sx
            }}
        >
        {items.map((item, idx) => {
            return (<ListItem
                        key={idx}
                        sx={{
                            backgroundColor: theme.palette.common.white,
                            borderRadius: '60px',
                            marginTop: '1em',
                            width: '98%'
                        }}
                        id={`new-item-list-${idx}`}
                        onClick={() => navigate(`/${item.action_type}/${item.id}`)}
                    >
                        <ListItemAvatar>
                        <Avatar
                            sx={{backgroundColor: typeColor[item.action_type]}}
                        >
                            {getIcon(item.action_type)}
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={translate(typeString[item.action_type])}
                            secondary={generateSubtitle(item)}
                        />
                    </ListItem>)
        })}
            
    </List>
}

export default CustomList