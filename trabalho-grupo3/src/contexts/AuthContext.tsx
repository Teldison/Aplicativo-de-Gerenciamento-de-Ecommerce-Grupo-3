import { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthContextData{
    isLogged: boolean;
    user: User;
    singIn:(usuario: User)=> Promise<void>;
    singOut:() => Promise<void>;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({children} : {children : ReactNode}) =>{
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const loadStorageData = async () => {
          const storageUser: any = await AsyncStorage.getItem("@Usuario:user");
          if (storageUser) {
            setUser(JSON.parse(storageUser));
            setIsLogged(true);
          }
        };
        loadStorageData();
      }, []);
    

    const singIn = async (usuario : User) => {
        setIsLogged(true);
        setUser(usuario);
        console.log("Chegou no login")
        return Promise.resolve();
    }

    const singOut = () => {
        AsyncStorage.removeItem("@Usuario:user");
        setIsLogged(false);
        setUser(null);
        console.log("Chegou no logout")
        return Promise.resolve();
    }

    return(
        <AuthContext.Provider value={{isLogged, user, singIn, singOut}}>
            {children}
        </AuthContext.Provider>
    )
}