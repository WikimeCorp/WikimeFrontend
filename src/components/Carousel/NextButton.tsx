import { FC } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import cl from "./btns.module.css";

interface BtnProps {
    enabled: boolean,
    onClick: () => void,
};

const NextButton: FC<BtnProps> = ({ enabled, onClick }) => {
    return (
        <button
        className="embla__button embla__button--next"
        onClick={onClick}
        disabled={!enabled}
        >
            <FontAwesomeIcon icon={faChevronRight} className={cl.btn}/>
        </button>
    );
};

export default NextButton;