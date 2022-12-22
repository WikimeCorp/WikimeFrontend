import { FC, ButtonHTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import cl from './OpenButton.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    active: boolean;
    onClick: () => void;
}

const OpenButton: FC<Props> = ({active, onClick}) => {

    return (
        <button onClick={onClick} className={cl.container}>
            <FontAwesomeIcon 
                icon={ active ? faChevronUp : faChevronDown } 
                className={cl.icon}
            />
        </button>
    );
};

export default OpenButton;