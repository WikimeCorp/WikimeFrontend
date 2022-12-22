import { ButtonHTMLAttributes, FC } from 'react';
import cl from './MainButton.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    onClick?: () => void;
    light?: boolean;
}

const MainButton: FC<Props> = ({children, onClick, light, ...props}) => {
    return (
        <button 
            onClick={onClick} 
            className={light ? cl.light : cl.main} 
            {...props}
        >
            {children}
        </button>
    );
};

export default MainButton;