import { FC, useState, MouseEvent } from "react";
import cl from "./FavoriteButton.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as starSol } from '@fortawesome/free-solid-svg-icons';
import { faStar as starReg } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from "../../../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { addToFavorites, removeFromFavorites } from "../../../../store/actions/userActions";
import { animeAPI } from "../../../../services/anime";


interface Props {
    children?: string;
    inArciclePage?: boolean;
    id: number;
}

const FavoriteButton: FC<Props> = ({ children, inArciclePage, id }) => {

    const location = useLocation();

    const auth = useAuth();
    const isAuth = !!auth.user;

    const dispatch = useAppDispatch();
    const favList = useAppSelector(state => state.userReduser.favorites);
    const active = favList.includes(id);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (active) {
            dispatch(removeFromFavorites(id));
        } else {
            dispatch(addToFavorites(id));
        };
    };

    if (isAuth) {
        if (children?.length) {
            return (
                active?
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
                {active?
                    <FontAwesomeIcon icon={starSol} className={cl.iconSmallActive}/>
                    : <FontAwesomeIcon icon={starReg} className={cl.iconSmall}/>
                }
            </button>
        );    
    };    

    if (children?.length) {
        return (
            <Link to={`/signin`} state={{ backgroundLocation: location }}>
            {active?
                <button className={ inArciclePage ? cl.inFav : cl.fav}>
                    {inArciclePage && <span>В избранном</span>}
                    <FontAwesomeIcon icon={starSol} className={cl.iconActive}/>        
                </button>
                : 
                <button className={cl.fav}>
                    {children}
                    <FontAwesomeIcon icon={starSol} className={cl.icon}/>        
                </button>}
            </Link>
        );
    };

    return (
        <Link to={`/signin`} state={{ backgroundLocation: location }}>
            <button className={cl.favSmall}>
                {active?
                    <FontAwesomeIcon icon={starSol} className={cl.iconSmallActive}/>
                    : <FontAwesomeIcon icon={starReg} className={cl.iconSmall}/>
                }
            </button>
        </Link>
    );    
};

export default FavoriteButton;