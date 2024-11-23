import { Children, createContext, useState, ReactNode } from "react";
import { User } from "../types/types";
import { AuthContextData } from "../types/authTypes";


export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({children} : {children : ReactNode}) =>{
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<any>(null);

    const singIn = (usuario : User) => {
        setIsLogged(true);
        setUser(usuario);
        console.log("Chegou no login")
    }

    const singOut = () => {
        setIsLogged(false);
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{isLogged, user, singIn, singOut}}>
            {children}
        </AuthContext.Provider>
    )
}