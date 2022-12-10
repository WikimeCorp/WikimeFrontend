import { FC, ButtonHTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import cl from "./CrossButton.module.css";


const CrossButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({...props}) => {

    return (
        <button className={cl.container} {...props}>
            <FontAwesomeIcon 
                icon={faXmark} 
                className={cl.icon}
            />
        </button>
    );
};

export default CrossButton;