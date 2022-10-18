import { FC } from "react";
import Comment from "../components/Comment";
import FavoriteButton from "../components/UI/button/favorite/FavouriteButton";
import MainButton from "../components/UI/button/main/MainButton";
import "../styles/Article.css";
import art from "../styles/img/Art.png";

const Article: FC = () => {
    return (
        <div className="Article-page">
            <div className="info">
                <div className="art">
                    <img src={art}/>
                    <FavoriteButton>Добавить в избранное</FavoriteButton>
                    <span>В избранном у 37 пользователей</span>
                </div>
                <div className="info-content">
                    <h1>Мастера Меча Онлайн: Прогрессив — Ария в беззвёздной ночи</h1>
                    <div className="info-content-main">
                        <div className="info-description">
                            <p><span>Оригинальное название:</span>劇場版 ソードアート・オンライン プログレッシブ 星なき夜のアリア</p>
                            <p className="info-genres">
                                <span>Жанры:</span>
                                Экшен Фэнтези Приключения Романтика Игры
                            </p>
                            <p><span>Режиссёр:</span>Рэки Кавахара</p>
                            <p><span>Дата выхода:</span>31.10.2021</p>
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
                <p>Асуна Юки была лучшей ученицей, усердно готовилась к вступительным 
                    экзаменам в старшую школу, но это было до того, как она одолжила у 
                    брата игровую систему виртуальной реальности и оказалась в ловушке 
                    Sword Art Online вместе с десятью тысячами других напуганных игроков. 
                    Проходит время, и Асуна начинает бояться, что станет с её жизнью за 
                    пределами фантастического мира. Какой неудачницей она может оказаться 
                    в глазах сверстников и родителей. Не желая ждать в сторонке, пока более 
                    опытные игроки пройдут игру, Асуна использует свои способности к обучению, 
                    чтобы изучить механику игры и владение мечом. Её быстрота впечатляет Кирито, 
                    профессионального геймера, который приглашает Асуну присоединиться к лучшим 
                    игрокам на передовой. Готова ли Асуна поменять рейтинг класса на рейтинг игрока 
                    и присоединиться к Кирито?</p>
                <span>Автор: <b>Twinqssly</b></span>
            </div>
            <div className="pictures">
                <h1>Арты и кадры</h1>
                <div className="pictures-content">
                    <img src={art}/>
                    <img src={art}/>
                    <img src={art}/>
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