import { FC, useState, useEffect } from "react";
import axios from "axios";
import { IPhoto } from "../types/types";
import art from "../styles/img/Art.png";
import cl from "./ArticleListItem.module.css"
import MainButton from "./UI/button/MainButton";
import FavoriteButton from "./UI/button/FavouriteButton";

const ArticleListItem: FC = () => {

    return (
        <div className={cl.card}>
            <img src={art}/>
            <div>
              <h1>Мастера Меча Онлайн: Прогрессив — Ария в беззвёздной ночи</h1>
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
                    <MainButton>Подробнее</MainButton>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
}

export default ArticleListItem;