import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FavoriteButton from '../components/UI/button/favorite/FavouriteButton';
import MainButton from '../components/UI/button/main/MainButton';
import RateButton from '../components/UI/button/rate/RateButton';
import { useAppDispatch } from '../hooks/redux';
import { useAuth } from '../hooks/useAuth';
import { useGetAnimeQuery } from '../store/API/anime';
import { getUserById } from '../store/actions/userActions';
import { setAddAnime } from '../store/reducers/AddAnimeSlice';
import CommentList from '../components/Comments/CommentList';
import NewComment from '../components/Comments/NewComment';
import { IUser } from '../types/IUser';
import Loading from './Loading';
import '../styles/Article.css';

const apiHost = process.env.REACT_APP_API_HOST;

const Article: FC = () => {
    const { id } = useParams();
    const auth = useAuth();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [author, setAuthor] = useState<IUser>();
    const { data: anime, isLoading, isSuccess } = useGetAnimeQuery(String(id));

    useEffect(() => {
        if (isSuccess) {
            dispatch(getUserById(anime.author))
                .unwrap()
                .then((result) => {
                    setAuthor(result);
                });
        }
    }, [isSuccess]);

    if (isLoading) {
        return <Loading />;
    }

    if (!anime) {
        return <h1>Anime not found :(</h1>;
    }

    const ratesCount = anime.rating.five + anime.rating.four + anime.rating.three + anime.rating.two + anime.rating.one;
    const ratesWord: string = ratesCount % 10 === 1 && ratesCount !== 11 ? 'оценка' : 'оценок';

    const inFavCount = anime.rating.inFavorites;
    const inFavUsers: string = inFavCount % 10 === 1 && inFavCount !== 11 ? 'пользователя' : 'пользователей';

    let isCanUpdate = auth.user && auth.user.role !== 'user';
    if (auth.user?.role === 'moderator' && !auth.user.added.includes(anime.id)) {
        isCanUpdate = false;
    }

    const updateClick = () => {
        dispatch(setAddAnime(anime));
        navigate('/add');
    };

    return (
        <div key={id} className="Article-page">
            <div className="info">
                <div className="art">
                    <div className="art-img">
                        <img src={`http://${apiHost}${anime.poster}`} alt="poster" />
                    </div>
                    <FavoriteButton id={anime.id} inArciclePage>
                        Добавить в избранное
                    </FavoriteButton>
                    <span>
                        В избранном у {inFavCount} {inFavUsers}
                    </span>
                </div>
                <div className="info-content">
                    <h1>{anime.title}</h1>
                    <div className="info-content-main">
                        <div className="info-description">
                            <p>
                                <span>Оригинальное название:</span>
                                {anime.originTitle}
                            </p>
                            <p className="info-genres">
                                <span>Жанры:</span>
                                {anime.genres.map((item) => `${item} `)}
                            </p>
                            <p>
                                <span>Режиссёр:</span>
                                {anime.director}
                            </p>
                            <p>
                                <span>Дата выхода:</span>
                                {anime.releaseDate}
                            </p>
                        </div>
                        <div className="info-ui">
                            <div className="info-ui-rate">
                                <span>{anime.rating.average}</span>
                                <p>
                                    {ratesCount} {ratesWord}
                                </p>
                                <RateButton animeId={anime.id}>Оценить</RateButton>
                            </div>
                            {isCanUpdate && <MainButton onClick={updateClick}>Редактировать статью</MainButton>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="description">
                <h1>Описание</h1>
                <p>{anime.description}</p>
                {author && (
                    <span>
                        Автор: <b>{author.nickname}</b>
                    </span>
                )}
            </div>
            {anime.images && (
                <div className="pictures">
                    <h1>Арты и кадры</h1>
                    <div className="pictures-content">
                        {anime.images.map((art, idx) => (
                            <div className="pictures-content-art" key={idx}>
                                <img key={idx} src={`http://${apiHost}${art}`} alt="art" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="comments">
                <h1>Комментарии</h1>
                <CommentList animeId={anime.id} />
                <NewComment animeId={anime.id} />
            </div>
        </div>
    );
};

export default Article;
