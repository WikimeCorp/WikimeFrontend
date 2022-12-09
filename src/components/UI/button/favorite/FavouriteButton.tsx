import { FC, useState, MouseEvent } from "react";
import cl from "./FavoriteButton.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as starSol } from '@fortawesome/free-solid-svg-icons';
import { faStar as starReg } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from "../../../../hooks/useAuth";


interface Props{
    children?: string;
    inArciclePage?: boolean;
    id: number;
}

const FavoriteButton: FC<Props> = ({ children, inArciclePage, id }) => {
    const auth = useAuth();

    const [active, setActive] = useState<boolean>(!!auth.user?.favorites.includes(id))

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (auth.user) {
            setActive(!active);
            // запрос на добавление/удаление из избранного
        } else {
            // войти
        }        
    }   

    if (children?.length) {
        return (
            active ?
                <button onClick={handleClick} className={ inArciclePage ? cl.inFav : cl.fav}>
                    {inArciclePage && <span>В избранном</span>}
                    <FontAwesomeIcon icon={starSol} className={cl.iconActive}/>        
                </button>
                : 
                <button onClick={handleClick} className={cl.fav}>
                    {children}
                    <FontAwesomeIcon icon={starSol} className={cl.icon}/>        
                </button>
        );
    };

    return (
        <button onClick={handleClick} className={cl.favSmall}>
            {active ?
                <FontAwesomeIcon icon={starSol} className={cl.iconSmallActive}/>
                : <FontAwesomeIcon icon={starReg} className={cl.iconSmall}/>
            }
        </button>
    );    
};

export default FavoriteButton;