import { ButtonHTMLAttributes, FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import cl from "./LogoutButton.module.css"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

const LogoutButton: FC<Props> = ({children, onClick, ...props}) => {
    const { logout } = useAuth0();
    return (
        <button onClick={() => logout({ returnTo: window.location.origin })} className={cl.main} {...props}>
            {children}
        </button>
    );
};

export default LogoutButton;