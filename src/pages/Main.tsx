import { FC } from 'react';
import "../styles/Main.css";
import art from "../styles/img/Art.png";
import MainButton from '../components/UI/button/main/MainButton';
import { useNavigate } from 'react-router-dom';
import EmblaCarousel from '../components/Carousel/Carousel';
import CardSmall from '../components/Cards/CardSmall';
import { useGetAnimesQuery } from '../services/anime';

const Main: FC = () => {

    const { data: animes, isLoading } = useGetAnimesQuery();
    const navigate = useNavigate();    
    
    if (isLoading) {
        return <div>Loading</div>
    };

    if (!animes) {
        return <div>No articles :(</div>
    };

    const slides = Array.from(animes.map(anime => <CardSmall article={anime}/>));

    return(
        <div className='Main-page'>
            <div className='landing'>
                <div className='landing-anime'>
                    <div className='poster'>
                        <img src={art} alt='poster'/>
                    </div>
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