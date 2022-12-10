import { ButtonHTMLAttributes, FC } from 'react';
import cl from "./UserButton.module.css"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

const UserButton: FC<Props> = ({children, onClick, ...props}) => {

    return (
        <button className={cl.main} {...props}>
            {children}
        </button>
    );
};

export default UserButton;