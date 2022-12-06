import { ButtonHTMLAttributes, FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import cl from "./LogoutButton.module.css"
import { useAuth } from '../../../../../hooks/useAuth';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

const LogoutButton: FC<Props> = ({children, ...props}) => {
    // const { logout } = useAuth0();
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