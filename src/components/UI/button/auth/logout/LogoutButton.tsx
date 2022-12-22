import { ButtonHTMLAttributes, FC } from 'react';
import { useAuth } from '../../../../../hooks/useAuth';
import cl from './LogoutButton.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

const LogoutButton: FC<Props> = ({children, ...props}) => {
    
    const auth = useAuth();

    const handleClick = () => {
        auth.signout();
    };

    return (
        <button onClick={handleClick} className={cl.main} {...props}>
            {children}
        </button>
    );
};

export default LogoutButton;