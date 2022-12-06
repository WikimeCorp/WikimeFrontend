import { ButtonHTMLAttributes, FC } from 'react';
import cl from "./MainButton.module.css"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    onClick?: () => void;
}

const MainButton: FC<Props> = ({children, onClick, ...props}) => {
    return (
        <button 
            onClick={onClick} 
            className={cl.main} 
            {...props}
        >
            {children}
        </button>
    );
};

export default MainButton;