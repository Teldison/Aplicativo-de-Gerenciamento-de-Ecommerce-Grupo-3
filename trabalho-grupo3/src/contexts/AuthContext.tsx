import { Children, createContext, useState, ReactNode } from "react";
import Usuario from "../models/Usuario";


export interface AuthContextData{
    isLogged: boolean;
    user: Usuario;
    singIn(usuario: Usuario) :Promise<void>;
    logOut(): void;
}


export const AuthContext = createContext<AuthContextData | undefined>(undefined);

const AuthProvider = ({children} : {children : ReactNode}) =>{
    const [user, setUser] = useState<any>(null);
    const [isLogged, setIsLogged] = useState<any>(false);

    const singIn = async (usuario : Usuario) => {
        setUser(usuario);
        setIsLogged(true);
        return Promise.resolve();
    }

    const logOut = () => {
        setUser(null);
        setIsLogged(false);
    }

    return(
        <AuthContext.Provider value={{isLogged, user, singIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;