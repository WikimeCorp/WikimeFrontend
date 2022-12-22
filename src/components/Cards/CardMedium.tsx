import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import MainButton from '../UI/button/main/MainButton';
import FavoriteButton from '../UI/button/favorite/FavouriteButton';
import { IAnime } from '../../types/IAnime';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../hooks/redux';
import { addToWatched } from '../../store/actions/userActions';
import cl from './CardMedium.module.css';

const apiHost = process.env.REACT_APP_API_HOST;

interface CardMediumProps {
    article: IAnime;
}

const CardMedium: FC<CardMediumProps> = ({ article }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const auth = useAuth();

    const onClick = () => {
        if (auth.user) {
            dispatch(addToWatched(article.id));
        }

        navigate(`../article/${article.id}`);
    };

    return (
        <div className={cl.card}>
            <div className={cl.poster}>
                <img src={article.poster && `http://${apiHost}${article.poster}`} alt="poster" />
            </div>
            <div className={cl.cardContent}>
                <div className={cl.titleContainer}>
                    <div className={cl.title}>{article.title}</div>
                </div>
                <div className={cl.content}>
                    <div className={cl.text}>{article.description}</div>
                    <div className={cl.ui}>
                        <FavoriteButton id={article.id}>Добавить в избранное</FavoriteButton>
                        <div className={cl.rateAndBtn}>
                            <div className={cl.rate}>
                                <p>Рейтинг</p>
                                <span>{article.rating.average}</span>
                            </div>
                            <MainButton onClick={() => onClick()}>Подробнее</MainButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardMedium;
