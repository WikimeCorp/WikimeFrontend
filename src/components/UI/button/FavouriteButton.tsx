import { FC } from "react";
import cl from "./FavoriteButton.module.css"

interface Props{
    children?: React.ReactNode;
    onClick?: () => void;
}

const FavoriteButton: FC<Props> = ({children, onClick}) => {
    return (
        <button onClick={onClick} className={cl.fav}>
            {children}
        </button>
    );
};


export default FavoriteButton;