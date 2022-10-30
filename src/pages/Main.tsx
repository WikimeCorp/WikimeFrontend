import { FC, useEffect } from 'react';
import "../styles/Main.css";
import art from "../styles/img/Art.png";
import MainButton from '../components/UI/button/main/MainButton';
import { useNavigate } from 'react-router-dom';
import EmblaCarousel from '../components/Carousel/Carousel';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchArticles } from '../store/action-creators/article';
import CardSmall from '../components/CardSmall';

const Main: FC = () => {
    const navigate = useNavigate();    
  
    const dispatch = useAppDispatch();
    const {articles, error, isloading} = useAppSelector(state => state.articleReducer)

    useEffect(() => {
        dispatch(fetchArticles())
    }, [])

    const slides = Array.from(articles.map(article => <CardSmall article={article}/>));

    return(
        <div className='Main-page'>
            <div className='landing'>
                <div className='landing-anime'>
                    <img src={art}/>
                    <span>Мастера Меча Онлайн: Прогрессив — Ария в беззвёздной ночи</span>
                </div>
                <div className='landing-info'>
                    <h1>Онлайн энциклопедия аниме</h1>
                    <MainButton onClick={() => navigate('/list')}>Перейти к статьям</MainButton>
                </div>
            </div>
            <div className='popular'>
                <h1>Популярное</h1>
                <EmblaCarousel slides={slides}/>                                 
            </div>
        </div>
    );
};

export default Main;