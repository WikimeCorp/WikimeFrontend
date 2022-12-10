import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
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
    const navigate = useNavigate();
    const user = useAppSelector(state => state.VkAuth.user);
    const token = localStorage.getItem('userToken');

    if (token && !user) {
        dispatch(getUserInfo());
    };

    const signin = () => { 
        return dispatch(getAccessToken())
                    .then(() => 
                        dispatch(getJWToken())
                        .then(() => 
                            dispatch(getUserInfo())
                        )
                    );                 
    };

    const signout = () => {
        navigate('../')
        window.scrollTo(0,0);
        return dispatch(logout());
    };

    const value = { user, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function RequireAuth({ children }: { children: JSX.Element }) {
    
    const token = localStorage.getItem('userToken');

    if(!token) {
        window.location.href = getAuthorizeCodeHref();  
    }

    return children;
};
  