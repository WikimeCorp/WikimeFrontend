import { FC, useState, MouseEvent } from "react";
import cl from "./FavoriteButton.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as starSol } from '@fortawesome/free-solid-svg-icons';
import { faStar as starReg } from '@fortawesome/free-regular-svg-icons';

interface Props{
    children?: string;
}

const FavoriteButton: FC<Props> = ({children}) => {

    const [active, setActive] = useState<boolean>(false)

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        setActive(!active);
    }   

    if (children?.length) {
        return (
            active ?
                <button onClick={handleClick} className={cl.fav}>
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