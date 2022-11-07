import userEvent from "@testing-library/user-event";
import { FC } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/Comments/Comment";
import FavoriteButton from "../components/UI/button/favorite/FavouriteButton";
import MainButton from "../components/UI/button/main/MainButton";
import { useGetAnimeQuery } from "../services/anime";
import { useGetUserQuery } from "../services/users";
import "../styles/Article.css";

const Article: FC = () => {

    const { id } = useParams();

    const { data: anime, isLoading, isSuccess } = useGetAnimeQuery(String(id));
    const { data: user, } = useGetUserQuery(String(anime?.author), { skip: !isSuccess });  

    if (isLoading) {
        return <div>Loading</div>
    };

    if (!anime) {
        return <div>Anime not found :(</div>
    };
    
    return (
        <div key={id} className="Article-page">
            <div className="info">
                <div className="art">
                    <div className="art-img">
                        <img src={anime.poster}/>
                    </div>
                    <FavoriteButton>Добавить в избранное</FavoriteButton>
                    <span>В избранном у 37 пользователей</span>
                </div>
                <div className="info-content">
                    <h1>{anime.title}</h1>
                    <div className="info-content-main">
                        <div className="info-description">
                            <p><span>Оригинальное название:</span>{anime.originTitle}</p>
                            <p className="info-genres">
                                <span>Жанры:</span>
                                {anime.geners.map((item) =>
                                    `${item} `
                                )}
                            </p>
                            <p><span>Режиссёр:</span>{anime.director}</p>
                            <p><span>Дата выхода:</span>{anime.releaseDate}</p>
                        </div>
                        <div className="info-ui">
                            <span>4.7</span>
                            <p>1487 оценок</p>
                            <MainButton>Оценить</MainButton>
                            <div className="edit">
                                <MainButton>Редактировать статью</MainButton>
                            </div>                                                        
                        </div>
                    </div>
                </div>
            </div>
            <div className="description">
                <h1>Описание</h1>
                <p>{anime.description}</p>
                <span>Автор: <b>{user?.nickname}</b></span>
            </div>
            <div className="pictures">
                <h1>Арты и кадры</h1>
                <div className="pictures-content">
                    {anime.images.map((art, idx) =>
                        <div className="pictures-content-art">
                            <img key={idx} src={art}/>
                        </div>                        
                    )}
                </div>
            </div>
            <div className="comments">
                <h1>Комментарии</h1>
                <Comment />
            </div>
        </div>
    );
};

export default Article;