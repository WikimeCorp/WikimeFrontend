import { FC, ButtonHTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import cl from './CrossButton.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    isComment?: boolean;
}

const CrossButton: FC<Props> = ({ isComment, ...props }) => {
    return (
        <button className={isComment ? cl.comment : cl.container} {...props}>
            <FontAwesomeIcon icon={faXmark} className={isComment ? cl.commentIcon : cl.icon} />
        </button>
    );
};

export default CrossButton;
