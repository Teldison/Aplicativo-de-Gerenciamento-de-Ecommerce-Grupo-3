import { Children, createContext, useState, ReactNode } from "react";

export const AuthContext = createContext<any>(undefined);

const AuthProvider = ({children} : {children : ReactNode}) =>{
    const [user, setUser] = useState<any>(null);

    const login = () => {
        setUser(user);
    }

    const logout = () => {
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{login, logout, isLogged : !!user}}>
            {children};
        </AuthContext.Provider>
    )
}
export default AuthProvider;