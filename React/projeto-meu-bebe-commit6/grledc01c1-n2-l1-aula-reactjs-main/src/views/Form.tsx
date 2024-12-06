import { useNavigate, useParams } from "react-router-dom";
import { AppBar, Button, Diaper, Eat, Grid, Sleep } from "../components";
import { useState, useEffect } from "react";
import { useAppContext } from "../Context";
import { drop, get, save, update } from "../services/supabase";
import { getTitle, validateFields } from "../utils/action";
//import { getUser } from "../utils/core";

const Form: React.FC = () => {
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


    return <>
        <AppBar title={translate(getTitle(actionType))} id={id} _delete={() => {
            const confirmar = confirm("Deseja deletar essa ação?");
            if(confirmar) {
                drop(id);
                showAlertMessage('Ação excluida', 'success');
                navigate("/")
            } else {
                showAlertMessage('Ação não foi excluida', 'error')
            }
        }}/>
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
                    onClick={async() => {
                        try{
                            const fields = validateFields(data, actionType);
                            if (fields.length === 0) {
                                if(id){
                                    await update("item", data, id);
                                }else{
                                    //data.user_id = getUser().id
                                    await save("item", data);
                                }
                                showAlertMessage(`Item ${id ? "editado" : "criado"} com sucesso!!!`, "success");                                
                                navigate("/");
                                
                            } else {
                                showAlertMessage(`Os campos ${fields.join(", ")} são obrigatório`, "warning");
                            }
                        } catch(err){
                            showAlertMessage(`Erro ao ${id ? "editar" : "criar"} item: ` + err, "error");
                        }
                    }}
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