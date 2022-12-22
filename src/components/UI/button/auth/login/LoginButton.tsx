import { ButtonHTMLAttributes, FC } from 'react';
import { getAuthorizeCodeHref } from '../../../../../store/actions/authActions';
import cl from './LoginButton.module.css';


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

const LoginButton: FC<Props> = ({children, ...props}) => {
    
    const handleClick = () => {
        window.location.href = getAuthorizeCodeHref();        
    };

    return (
        <button onClick={handleClick} className={cl.main} {...props}>
            {children}
        </button>
    );
};

export default LoginButton;