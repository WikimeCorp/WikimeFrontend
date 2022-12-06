import React, { createContext, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useAuth } from "../hooks/useAuth";
import { authAPI, useGetUserQuery } from "../services/auth";
import { getAccessToken, getAuthorizeCodeHref, getJWToken, getUserInfo } from "../store/actions/authActions";
import { logout, selectCurrentUser } from "../store/reducers/AuthSlice";
import { IUser } from "../types/IUser";


interface AuthContextType {
    user?: IUser;
    signin: () => void;
    signout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const code = useAppSelector(state => state.VkAuth.code); 
    const user = useAppSelector(state => state.VkAuth.user);
    
    const signin = () => {
        if(code)
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

    if (!!!auth.user) {
        window.location.href = getAuthorizeCodeHref();
    }

    return children;
};
  