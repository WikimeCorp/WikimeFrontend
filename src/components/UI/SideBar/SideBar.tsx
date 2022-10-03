import cl from "./SideBar.module.css"
import Genres from "../../../utils/Genres";

const SideBar = () => {
    return (
        <div className={cl.sideBar}>
            <div className={cl.header}>
                <h1>Жанры</h1>
            </div>
            <div className={cl.links}>
                {Genres.map(genre =>
                    <a href="#">
                        <label>
                            <input autoComplete="off" type="checkbox"/>
                            {genre}
                        </label>
                    </a>
                )}
            </div>
        </div>

    );
};

export default SideBar;