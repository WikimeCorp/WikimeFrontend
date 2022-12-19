import { FC } from "react";
import cl from "./CardSmall.module.css";
import FavoriteButton from "../UI/button/favorite/FavouriteButton";
import MainButton from "../UI/button/main/MainButton";
import { IAnime } from "../../types/IAnime"
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { useAuth } from "../../hooks/useAuth";
import { addToWatched } from "../../store/actions/userActions";


const apiHost = process.env.REACT_APP_API_HOST;
const apiPort = process.env.REACT_APP_API_PORT;

interface CardSmallProps {
    article: IAnime;
}

const CardSmall: FC<CardSmallProps> = ({article}) => {
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const auth = useAuth();

    const onClick = () => {
      if (auth.user) {
        dispatch(addToWatched(article.id));
      };

      navigate(`../article/${article.id}`)
    }

    return (
        <div className={cl.card}>
            <div className={cl.art}>
                <div className={cl.centerCropped}>
                    <img src={article.poster && `http://${apiHost}${article.poster}`} alt="poster"/>
                </div>
                <FavoriteButton id={article.id}></FavoriteButton>
                <p>{article.rating.average}</p>
            </div>            
            <div className={cl.titleContainer}>
              <div className={cl.title}>
                {article.title}
              </div>
            </div>
            <MainButton onClick={() => onClick()}>Подробнее</MainButton>
        </div>
    );
};

export default CardSmall;