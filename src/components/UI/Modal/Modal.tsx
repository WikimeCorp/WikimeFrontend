import { FC } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../button/auth/login/LoginButton";
import cl from "./Modal.module.css";


const Modal: FC = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    }

    return (
        <div className={cl.modal} onClick={handleClick}>
            <div 
                className={cl.content}
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Необходимо авторизоваться</h2>
                <LoginButton>Войти через VK</LoginButton>
            </div>
        </div>
    )
};

export default Modal;