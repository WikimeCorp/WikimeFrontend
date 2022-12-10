import { FC, useState, MouseEvent } from "react";
import cl from "./FavoriteButton.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as starSol } from '@fortawesome/free-solid-svg-icons';
import { faStar as starReg } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from "../../../../hooks/useAuth";
import Modal from "../../Modal/Modal";
import LoginButton from "../auth/login/LoginButton";


interface Props {
    children?: string;
    inArciclePage?: boolean;
    id: number;
}

const FavoriteButton: FC<Props> = ({ children, inArciclePage, id }) => {

    const auth = useAuth();
    const isAuth = !!auth.user;

    const [active, setActive] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (isAuth) {            
            setActive(!active);
            // запрос на добавление/удаление из избранного
        } else {
            // войти
            setVisible(true);
        }        
    }   

    if (children?.length) {
        return (
            <>
            <Modal visible={visible} setVisible={setVisible}>
                <LoginButton>Войти через VK</LoginButton>
            </Modal>
            {active ?
                <button onClick={handleClick} className={ inArciclePage ? cl.inFav : cl.fav}>
                    {inArciclePage && <span>В избранном</span>}
                    <FontAwesomeIcon icon={starSol} className={cl.iconActive}/>        
                </button>
                : 
                <button onClick={handleClick} className={cl.fav}>
                    {children}
                    <FontAwesomeIcon icon={starSol} className={cl.icon}/>        
                </button>}
            </>
        );
    };

    return (
        <>
            <Modal visible={visible} setVisible={setVisible}>
                <h1>Вход на WIKIME</h1>
                <LoginButton>Войти через VK</LoginButton>
            </Modal>
            <button onClick={handleClick} className={cl.favSmall}>
                {active ?
                    <FontAwesomeIcon icon={starSol} className={cl.iconSmallActive}/>
                    : <FontAwesomeIcon icon={starReg} className={cl.iconSmall}/>
                }
            </button>
        </>
    );    
};

export default FavoriteButton;