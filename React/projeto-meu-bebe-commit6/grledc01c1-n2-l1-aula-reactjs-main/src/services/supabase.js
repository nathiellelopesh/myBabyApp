import { createClient } from '@supabase/supabase-js';
//import { getUser } from '../utils/core';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

//const user = getUser()

const update = async (table, data, id) => {
    console.log(data.id)
    if(id) {
        data.id = id
    }
    
    return await supabase.from(table).upsert(data).select()
};

const drop = async (table, id) => {
    return await supabase.from(table).delete().eq("id", id)
};

const get = async (table, id) => {
    const {data, error} =  await supabase.from(table).select().eq("id", id).order('created_at', {ascending: false});
    if(error) {
        throw error
    }
    return data[0]
};

const list = async (table) => {
    const {data, error} =  await supabase.from(table).select().order('created_at', {ascending: false});
    if(error) {
        throw error
    }
    return data
};

const save = async (table, data) => {
    console.log(data)
    update(table, data, null)
}

export {save, update, drop, get, list}
//