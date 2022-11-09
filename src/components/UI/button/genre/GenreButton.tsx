import { ButtonHTMLAttributes, FC, useState, MouseEvent } from 'react';
import { useAppDispatch } from '../../../../hooks/redux';
import { addGenre, deleteGenre } from '../../../../store/reducers/GenresSlice';
import cl from "./GenreButton.module.css"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
    onClick?: () => void;
}

const GenreButton: FC<Props> = ({children, onClick, ...props}) => {

    const [active, setActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        active ? dispatch(deleteGenre(children)) : dispatch(addGenre(children));
        setActive(!active);
    };  

    return (
        active ?
            <button type="button" onClick={handleClick} className={cl.active} {...props}>
                {children}
            </button>
        :
            <button type="button" onClick={handleClick} className={cl.main} {...props}>
                {children}
            </button>
    );
};

export default GenreButton;