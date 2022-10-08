import { FC } from "react";
import cl from "./FavoriteButton.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as starSol } from '@fortawesome/free-solid-svg-icons';
import { faStar as starReg } from '@fortawesome/free-regular-svg-icons';

interface Props{
    children?: string;
    onClick?: () => void;
}

const FavoriteButton: FC<Props> = ({children, onClick}) => {
    if (children?.length) {
        return (
        <button onClick={onClick} className={cl.fav}>
            {children}
            <FontAwesomeIcon icon={starSol} className={cl.icon}/>
        </button>
        );
    };

    return (
        <button onClick={onClick} className={cl.favSmall}>
            <FontAwesomeIcon icon={starReg} className={cl.iconSmall}/>
        </button>
    );    
};

export default FavoriteButton;