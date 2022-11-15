import { FC, ButtonHTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare} from '@fortawesome/free-regular-svg-icons';
import cl from "./PlusButton.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
}

const PlusButton: FC<Props> = ({onClick}) => {

    return (
        <button onClick={onClick} className={cl.container}>
            <FontAwesomeIcon 
                icon={faPlusSquare} 
                className={cl.icon}
            />
        </button>
    );
};

export default PlusButton;