import { FC } from "react";
import art from "../styles/img/Art.png";
import cl from "./CardSmall.module.css";
import FavoriteButton from "./UI/button/FavouriteButton";
import MainButton from "./UI/button/MainButton";
import { IArticle } from "../models/IArticle"

interface CardSmallProps {
    article: IArticle;
}

const CardSmall: FC<CardSmallProps> = ({article}) => {
    return (
        <div className={cl.card}>
            <div className={cl.art}>
                <img src={article.url}/>
                <FavoriteButton></FavoriteButton>
                <p>4.7</p>
            </div>
            <h1>{article.title}</h1>
            <MainButton>Подробнее</MainButton>
        </div>
    );
};

export default CardSmall;