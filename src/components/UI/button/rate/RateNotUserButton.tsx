import { ButtonHTMLAttributes, FC } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import cl from "./RateButton.module.css"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

const RateNotUserButton: FC<Props> = ({children, ...props}) => {

    const location = useLocation();

    return (
        <Link to={`/signin`} state={{ backgroundLocation: location }}>
            <div className={cl.container}>
                <button
                    className={cl.main} 
                    {...props}
                >
                    {children}
                </button>        
        </div>
        </Link>
    );
};

export default RateNotUserButton;