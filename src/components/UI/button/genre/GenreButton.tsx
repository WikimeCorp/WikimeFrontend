import { ButtonHTMLAttributes, FC, useState, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { addGenre, deleteGenre } from '../../../../store/reducers/AddAnimeSlice';
import cl from './GenreButton.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
    onClick?: () => void;
}

const GenreButton: FC<Props> = ({children, onClick, ...props}) => {

    const currentGenres = useAppSelector(state => state.addAnimeReducer.genres);
    const [active, setActive] = useState<boolean>(currentGenres ? currentGenres.includes(children) : false);
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