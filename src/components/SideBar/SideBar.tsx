import cl from "./SideBar.module.css"
import Genres from "../../utils/Genres";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addGenre, deleteGenre } from "../../store/reducers/BtnsSlice";

const SideBar = () => {

    const genres = useAppSelector(state => state.btnsReducer.genres);
    const dispatch = useAppDispatch();

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, genre: string) => {
        if (e.target.checked) {
            dispatch(addGenre(genre));
        } else {
            dispatch(deleteGenre(genre));
        };
    };

    return (
        <div className={cl.sideBar}>
            <div className={cl.header}>
                <h1>Жанры</h1>
            </div>
            <div className={cl.links}>
                {Genres.map((genre, idx) =>
                    <a key={idx} href="#">
                        <label>
                            <input 
                                type="checkbox" 
                                defaultChecked={genres.includes(genre)}
                                onChange={(e) => handleCheck(e, genre)}
                            />
                            {genre}
                        </label>
                    </a>
                )}
            </div>
        </div>
    );
};

export default SideBar;