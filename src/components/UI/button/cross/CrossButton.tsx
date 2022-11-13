import { FC, ButtonHTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import cl from "./CrossButton.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
}

const CrossButton: FC<Props> = ({onClick}) => {

    return (
        <button onClick={onClick} className={cl.container}>
            <FontAwesomeIcon 
                icon={faXmark} 
                className={cl.icon}
            />
        </button>
    );
};

export default CrossButton;