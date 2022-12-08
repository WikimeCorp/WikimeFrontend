import React, { createContext, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useAuth } from "../hooks/useAuth";
import { getAccessToken, getAuthorizeCodeHref, getJWToken, getUserInfo } from "../store/actions/authActions";
import { logout } from "../store/reducers/AuthSlice";
import { IUser } from "../types/IUser";


interface AuthContextType {
    user?: IUser;
    signin: () => void;
    signout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch(); 
    const user = useAppSelector(state => state.VkAuth.user);
    
    const signin = () => {
        // const token = localStorage.getItem('userToken');
        // if (token != null) {
        //     console.log('sign with token')
        //     return dispatch(getUserInfo());
        // } else {
        //     return dispatch(getAccessToken())
        //             .then(() => 
        //                 dispatch(getJWToken())
        //                 .then(() => 
        //                     dispatch(getUserInfo())
        //                 )
        //             ); 
        // }   
        return dispatch(getAccessToken())
                    .then(() => 
                        dispatch(getJWToken())
                        .then(() => 
                            dispatch(getUserInfo())
                        )
                    );                 
    };

    const signout = () => {
        return dispatch(logout());
    };

    const value = { user, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function RequireAuth({ children }: { children: JSX.Element }) {
    const auth = useAuth();

    return children;
};
  