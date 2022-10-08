import { FC } from "react";
import art from "../styles/img/Art.png";
import cl from "./CardSmall.module.css";
import FavoriteButton from "./UI/button/FavouriteButton";
import MainButton from "./UI/button/MainButton";

const CardSmall: FC = () => {
    return (
        <div className={cl.card}>
            <div className={cl.art}>
                <img src={art}/>
                <FavoriteButton></FavoriteButton>
                <p>4.7</p>
            </div>            
            <div className={cl.content}>
                <h1>Мастера Меча Онлайн: Прогрессив — Ария в беззвёздной ночи</h1>
                <MainButton>Подробнее</MainButton>
            </div>
        </div>
    );
};

export default CardSmall;