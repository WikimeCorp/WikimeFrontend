import { FC } from "react";
import art from "../styles/img/Art.png";
import cl from "./CardSmall.module.css";
import FavoriteButton from "./UI/button/favorite/FavouriteButton";
import MainButton from "./UI/button/main/MainButton";
import { IArticle } from "../models/IArticle"
import { useNavigate } from "react-router-dom";

interface CardSmallProps {
    article: IArticle;
}

const CardSmall: FC<CardSmallProps> = ({article}) => {

    const navigate = useNavigate();

    return (
        <div className={cl.card}>
            <div className={cl.art}>
                <img src={article.url}/>
                <FavoriteButton></FavoriteButton>
                <p>4.7</p>
            </div>
            <h2>{article.title}</h2>
            <MainButton onClick={() => navigate('/article')}>Подробнее</MainButton>
        </div>
    );
};

export default CardSmall;