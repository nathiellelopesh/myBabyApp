import { redirect } from "react-router-dom";

const isAuthenticated = () => {
    const session = localStorage.getItem("session");

    if (session) throw redirect("/");
    return null;
}

const handleVerificationProtected = () => {
    const session = localStorage.getItem("session");

    if (!session) throw redirect("/signin");
    return null;
}

const signIn = async (email, password, supabase) => {
    
    return await supabase.auth.signInWithPassword({
        email, password
    });
}

const signUp = async (email, password, supabase) => {
    //no site procurar por create new user - docs/reference/javascript
    return await supabase.auth.signUp({
        email, password
    });
}

const signOut = async (supabase) => {
    try {
        const { error } = await supabase.auth.signOut();
        localStorage.removeItem("session");
        if (error) {
            console.error("Erro ao fazer logout:", error.message);
            throw error;
        }
        console.log("Logout realizado com sucesso");
    } catch (err) {
        console.error("Erro inesperado no logout:", err);
    } finally {
        supabase.auth.onAuthStateChange((event) => {
            console.log("Evento de autenticação:", event);
        });
    }
};



export {
    isAuthenticated,
    handleVerificationProtected,
    signIn,
    signUp,
    signOut
}