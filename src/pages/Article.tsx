import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comments/Comment";
import FavoriteButton from "../components/UI/button/favorite/FavouriteButton";
import MainButton from "../components/UI/button/main/MainButton";
import RateButton from "../components/UI/button/rate/RateButton";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useAuth } from "../hooks/useAuth";
import { useGetAnimeQuery } from "../services/anime";
import { addToWatched } from "../store/actions/userActions";
import { setAddAnime } from "../store/reducers/AddAnimeSlice";
import { addAllGenres } from "../store/reducers/BtnsSlice";
import "../styles/Article.css";


const apiHost = process.env.REACT_APP_API_HOST;
const apiPort = process.env.REACT_APP_API_PORT;

const Article: FC = () => {

    const { id } = useParams();
    const id_num = Number(id);
    const auth = useAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const watched = useAppSelector(state => state.userReduser.watched);
    const { data: anime, isLoading, isSuccess } = useGetAnimeQuery(String(id));
    //const { data: user, } = useGetUserQuery(String(anime?.author), { skip: !isSuccess });  
    
    useEffect(() => {
        if (auth.user && isSuccess && !watched.includes(id_num)) {
            dispatch(addToWatched(id_num));
        };
    },[isSuccess]) 

    if (isLoading) {
        return <h1>Loading</h1>
    };

    if (!anime) {
        return <h1>Anime not found :(</h1>
    };       
    
    const ratesCount = anime.rating.five + anime.rating.four + anime.rating.three 
        + anime.rating.two + anime.rating.one;
    const ratesWord: string = ((ratesCount % 10 === 1) && (ratesCount !== 11)) ?
        "оценка" : "оценок";

    const inFavCount = anime.rating.inFavorites;
    const inFavUsers: string = ((inFavCount % 10 === 1) && (inFavCount !== 11)) ?
        "пользователя" : "пользователей";

    const updateClick = () => {
        dispatch(setAddAnime(anime));
        dispatch(addAllGenres(anime.genres));
        navigate('/add');
    }
    
    return (
        <div key={id} className="Article-page">
            <div className="info">
                <div className="art">
                    <div className="art-img">
                        <img src={`http://${apiHost}${anime.poster}`} alt='poster'/>
                    </div>
                    <FavoriteButton id={anime.id} inArciclePage>Добавить в избранное</FavoriteButton>
                    <span>В избранном у {inFavCount} {inFavUsers}</span>
                </div>
                <div className="info-content">
                    <h1>{anime.title}</h1>
                    <div className="info-content-main">
                        <div className="info-description">
                            <p><span>Оригинальное название:</span>{anime.originTitle}</p>
                            <p className="info-genres">
                                <span>Жанры:</span>
                                {anime.genres.map((item) =>
                                    `${item} `
                                )}
                            </p>
                            <p><span>Режиссёр:</span>{anime.director}</p>
                            <p><span>Дата выхода:</span>{anime.releaseDate}</p>
                        </div>
                        <div className="info-ui">
                            <div className="info-ui-rate">
                                <span>{anime.rating.average}</span>
                                <p>{ratesCount} {ratesWord}</p>                           
                                <RateButton>Оценить</RateButton> 
                            </div>
                            {auth.user && auth.user.role !== "user" && 
                                <MainButton onClick={updateClick}>Редактировать статью</MainButton>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="description">
                <h1>Описание</h1>
                <p>{anime.description}</p>
                {/* <span>Автор: <b>{user?.nickname}</b></span> */}
            </div>
            {anime.images &&                     
            <div className="pictures">
                <h1>Арты и кадры</h1>
                <div className="pictures-content">
                    {anime.images.map((art, idx) =>
                        <div className="pictures-content-art" key={idx}>
                            <img key={idx} src={`http://${apiHost}${art}`} alt='art'/>
                        </div>                        
                    )}
                </div>
            </div>}
            <div className="comments">
                <h1>Комментарии</h1>
                <Comment />
            </div>
        </div>
    );
};

export default Article;