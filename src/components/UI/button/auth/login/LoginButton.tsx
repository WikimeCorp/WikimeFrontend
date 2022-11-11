import { ButtonHTMLAttributes, FC } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
import cl from "./LoginButton.module.css"

const clientId = process.env.REACT_APP_CLIENT_ID;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

const LoginButton: FC<Props> = ({children, ...props}) => {

    const cbLink = `http://localhost:3000/`;

    const handleRedirect = () => {
        window.location.href = `https://oauth.vk.com/authorize?client_id=${clientId}&display=page&redirect_uri=${cbLink}&response_type=code&v=5.120&state=4194308`;
      };

    return (
        <button onClick={handleRedirect} className={cl.main} {...props}>
            {children}
        </button>
    );
};

export default LoginButton;