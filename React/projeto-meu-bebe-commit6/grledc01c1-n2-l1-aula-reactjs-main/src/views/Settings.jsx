import { useNavigate } from "react-router-dom";
import { AppBar } from "../components";
import { useAppContext } from "../Context";

const Settings = () => {
    const {translate, showAlertMessage} = useAppContext();

    const navigate = useNavigate()

    return <>
        <AppBar title={translate('settings')} />
    </>
};

export default Settings;