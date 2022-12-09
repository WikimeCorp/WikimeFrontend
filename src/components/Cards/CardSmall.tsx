import { FC } from "react";
import cl from "./CardSmall.module.css";
import FavoriteButton from "../UI/button/favorite/FavouriteButton";
import MainButton from "../UI/button/main/MainButton";
import { IAnime } from "../../types/IAnime"
import { useNavigate } from "react-router-dom";


const apiHost = process.env.REACT_APP_API_HOST;
const apiPort = process.env.REACT_APP_API_PORT;

interface CardSmallProps {
    article: IAnime;
}

const CardSmall: FC<CardSmallProps> = ({article}) => {
    
    const navigate = useNavigate();

    return (
        <div className={cl.card}>
            <div className={cl.art}>
                <div className={cl.centerCropped}>
                    <img src={`http://${apiHost}:${apiPort}${article.poster}`} alt="poster"/>
                </div>
                <FavoriteButton id={article.id}></FavoriteButton>
                <p>{article.rating.average}</p>
            </div>            
            <div className={cl.titleContainer}>
              <div className={cl.title}>
                {article.title}
              </div>
            </div>
            <MainButton onClick={() => navigate(`article/${article.id}`)}>Подробнее</MainButton>
        </div>
    );
};

export default CardSmall;