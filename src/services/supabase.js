import { createClient } from '@supabase/supabase-js';
//import { getUser } from '../utils/core';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

//const user = getUser()

const update = async (table, data, id) => {
    console.log('dados: ', data)
    
    if(id) {
        data.id = id
        console.log("id: ", data.id)
    }

    try{
        const { data: updatedData, error } = await supabase.from(table).upsert(data).select();
        console.log("Dados enviados:", data);

        if (error) {
            console.error("Erro ao atualizar dados:", error);
            throw error;
        }
        return updatedData;
    } catch(erro){
        console.log("Erro em salvar ou editar", erro)
        throw erro;
    }
    
    
};

const drop = async (table, id) => {
    try {
        console.log("id para excluir", id)
        return await supabase.from(table).delete().eq("id", id);
    } catch (error) {
        throw error
    }
    
};

const get = async (table, id) => {
    const {data, error} =  await supabase.from(table).select().eq("id", id).order('created_at', {ascending: false});
    if(error) {
        throw error
    }
    return data[0]
};

const list = async (table) => {
    try {
        const {data, error} =  await supabase.from(table).select().order('created_at', {ascending: false});
        //console.log(data)
        return data
    } catch (error) {
        console.log("Erro em salvar ou editar", error)
    }

    
};

const save = async (table, data) => {
    console.log(data)
    update(table, data, null)
    
}

export {save, update, drop, get, list}
