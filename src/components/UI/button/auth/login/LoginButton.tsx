import { ButtonHTMLAttributes, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { useAuth } from '../../../../../hooks/useAuth';
import { getAuthorizeCodeHref } from '../../../../../store/actions/authActions';
import { setCode } from '../../../../../store/reducers/AuthSlice';
import cl from "./LoginButton.module.css";


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

const LoginButton: FC<Props> = ({children, ...props}) => {

    const dispatch = useAppDispatch();
    const code = useAppSelector(state => state.VkAuth.code); 
    const auth = useAuth();   
    
    const handleClick = () => {
        window.location.href = getAuthorizeCodeHref();        
    }

    if (window.location.search) {
        dispatch(setCode());
    };

    if(code && !auth.user) {
        auth.signin();
    };

    return (
        <button onClick={handleClick} className={cl.main} {...props}>
            {children}
        </button>
    );
};

export default LoginButton;