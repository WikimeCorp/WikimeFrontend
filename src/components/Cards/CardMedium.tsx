import { FC, useState, useEffect } from "react";
import cl from "./CardMedium.module.css"
import MainButton from "../UI/button/main/MainButton";
import FavoriteButton from "../UI/button/favorite/FavouriteButton";
import { IAnime } from "../../types/IAnime"
import { useNavigate } from "react-router-dom";

interface CardMediumProps {
  article: IAnime;
}

const CardMedium: FC<CardMediumProps> = ({article}) => {

    const navigate = useNavigate();

    return (
        <div className={cl.card}>
          <div className={cl.poster}>
            <img src={article.poster} alt="poster"/>
          </div>
          <div className={cl.cardContent}>
            <div className={cl.titleContainer}>
              <div className={cl.title}>
                {article.title}
              </div>
            </div>
            <div className={cl.content}>
              <div className={cl.text}>
                {article.description} 
              </div>
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