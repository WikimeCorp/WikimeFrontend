import { FC } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/Comments/Comment";
import FavoriteButton from "../components/UI/button/favorite/FavouriteButton";
import MainButton from "../components/UI/button/main/MainButton";
import RateButton from "../components/UI/button/rate/RateButton";
import { useGetAnimeQuery } from "../services/anime";
import "../styles/Article.css";


const apiHost = process.env.REACT_APP_API_HOST;
const apiPort = process.env.REACT_APP_API_PORT;

const Article: FC = () => {
    const { id } = useParams();
    const { data: anime, isLoading } = useGetAnimeQuery(String(id));
    //const { data: user, } = useGetUserQuery(String(anime?.author), { skip: !isSuccess });  

    if (isLoading) {
        return <div>Loading</div>
    };

    if (!anime) {
        return <div>Anime not found :(</div>
    };

    const ratesCount = anime.rating.five + anime.rating.four + anime.rating.three 
        + anime.rating.two + anime.rating.one;
    
    return (
        <div key={id} className="Article-page">
            <div className="info">
                <div className="art">
                    <div className="art-img">
                        <img src={`http://${apiHost}${anime.poster}`} alt='poster'/>
                    </div>
                    <FavoriteButton id={anime.id} inArciclePage>Добавить в избранное</FavoriteButton>
                    <span>В избранном у {anime.rating.inFavorites} пользователей</span>
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
                                <p>{ratesCount} оценок</p>                           
                                <RateButton>Оценить</RateButton> 
                            </div>
                            <MainButton>Редактировать статью</MainButton>
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