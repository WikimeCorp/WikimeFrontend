import { FC } from 'react';
import cl from "./MainButton.module.css"

interface Props{
    children?: React.ReactNode;
    onClick?: () => void;
}

const MainButton: FC<Props> = ({children, onClick}) => {
    return (
        <button onClick={onClick} className={cl.main}>
            {children}
        </button>
    );
};

export default MainButton;