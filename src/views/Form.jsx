import { useNavigate, useParams } from "react-router-dom";
import { AppBar, Button, Diaper, Eat, Grid, Sleep } from "../components";
import { useState, useEffect } from "react";
import { useAppContext } from "../Context";
import { drop, get, save, update } from "../services/supabase";
import { getTitle, validateFields } from "../utils/action";
//import { getUser } from "../utils/core";

const Form = () => {
    const navigate = useNavigate()
    const {translate, showAlertMessage} = useAppContext()

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})

    const params = useParams();
    const actionType = params.type;
    const id = params.id

    const getParamType = () => {
        switch(params.type) {
            case '1':
                return <Sleep data={data} setData={setData}/>;
            case '2':
                return <Eat data={data} setData={setData}/>;
            case '3':
                return <Diaper data={data} setData={setData}/>
            default:
                return <Eat data={data} setData={setData}/>
        }
    }

    const loadData = async(id) => {
        if(id) {
            const result = await get("item", id);
            setData(result)
        }
    }

    useEffect(() => {
        if (params && params.id) {
            loadData(params.id);
        }
    }, [])


    const saveAction = async() => {
        console.log(data)
        try{           
            if(id){
                if(!data.start_date) {
                    showAlertMessage(translate("field-start-date-required"), "error")
                } else {
                    await update("item", data, id);
                    showAlertMessage(translate("form-saved"), "success");  
                    navigate("/");
                }
            }else{
                if(!data.start_date) {
                    showAlertMessage(translate("field-start-date-required"), "error")
                } else {
                    await save("item", data);
                    showAlertMessage(translate("form-saved"), "success");  
                    navigate("/");
                }
            }
        } catch(err){
            showAlertMessage(translate("something-went-wrong") + err, "error");
        }
    }

    const deleteAction = async() => {
        const confirmar = confirm("Deseja deletar essa ação?");
            if(confirmar) {
                //console.log(id)
                await drop("item", id);
                showAlertMessage(translate('action-excluded'), 'success');
                navigate("/")
            } else {
                showAlertMessage(translate("something-went-wrong"), 'error');
            }
    }


    return <>
        <AppBar title={translate(getTitle(actionType))} id={id} _delete={deleteAction}/>
        <Grid container={true} spacing={2}
            sx={{
                marginTop: '1em',
                padding: '1em'
            }}
        >
            <Grid item={true} size={{xs: 12}}>
            { getParamType(actionType) }
                <Button
                    Loading={loading}
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
    </>
    
};

export default Form;
//