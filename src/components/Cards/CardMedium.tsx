import { FC, useState, useEffect } from "react";
import art from "../styles/img/Art.png";
import cl from "./CardMedium.module.css"
import MainButton from "../UI/button/main/MainButton";
import FavoriteButton from "../UI/button/favorite/FavouriteButton";
import { IArticle } from "../../models/IArticle"
import { useNavigate } from "react-router-dom";

interface CardMediumProps {
  article: IArticle;
}

const CardMedium: FC<CardMediumProps> = ({article}) => {

    const navigate = useNavigate();

    return (
        <div className={cl.card}>
            <img src={article.url}/>
            <div className={cl.cardContent}>
              <h1>{article.title}</h1>
              <div className={cl.content}>
                <p>Асуна Юки была лучшей ученицей, усердно готовилась к
                  вступительным экзаменам в старшую школу, но это было
                  до того, как она одолжила у брата игровую систему виртуальной
                  реальности и оказалась в ловушке Sword Art Online вместе с
                  десятью тысячами других напуганных... 
                </p>
                <div className={cl.ui}>
                  <FavoriteButton>Добавить в избранное</FavoriteButton>
                  <div className={cl.rateAndBtn}>
                    <div className={cl.rate}>                      
                      <p>Рейтинг</p>
                      <span>4.7</span>
                    </div>
                    <MainButton onClick={() => navigate('/article')}>Подробнее</MainButton>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
}

export default CardMedium;