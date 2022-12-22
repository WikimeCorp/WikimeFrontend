import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import cl from './btns.module.css';

interface BtnProps {
    enabled: boolean,
    onClick: () => void,
};

const PrevButton: FC<BtnProps> = ({ enabled, onClick }) => {
    return (
        <button
            className="embla__button embla__button--prev"
            onClick={onClick}
            disabled={!enabled}
        >
            <FontAwesomeIcon icon={faChevronLeft} className={cl.btn}/>
        </button>
    );
};

export default PrevButton;