import { FC } from "react";
import art from "../styles/img/Art.png";
import cl from "./CardSmall.module.css";
import FavoriteButton from "../UI/button/favorite/FavouriteButton";
import MainButton from "../UI/button/main/MainButton";
import { IAnime } from "../../types/IAnime"
import { useNavigate } from "react-router-dom";

interface CardSmallProps {
    article: IAnime;
}

const CardSmall: FC<CardSmallProps> = ({article}) => {

    const navigate = useNavigate();

    return (
        <div className={cl.card}>
            <div className={cl.art}>
                <div className={cl.centerCropped}>
                    <img src={article.poster} alt="poster"/>
                </div>
                <FavoriteButton></FavoriteButton>
                <p>4.7</p>
            </div>
            <h2>{article.title}</h2>
            <MainButton onClick={() => navigate('/article')}>Подробнее</MainButton>
        </div>
    );
};

export default CardSmall;