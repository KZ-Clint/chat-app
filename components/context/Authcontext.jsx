import { createContext, useReducer, useEffect } from "react"
import AuthReducer from "./Authreducer";

const INITIAL_STATE = {
    user: null,
    isFetching:false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(AuthReducer, INITIAL_STATE)
    const { user, isFetching, error } = state

    useEffect(() => {
      
            const userd = JSON.parse(localStorage.getItem('userd') )
            dispatch({ type:'LOGIN_ALREADY', payload: userd })
        
      }, []);
  

    return (
        <AuthContext.Provider value={{ user, isFetching, error, dispatch }} >
            {children}
        </AuthContext.Provider>
    )
}