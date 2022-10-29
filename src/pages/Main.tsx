import { FC } from 'react';
import "../styles/Main.css";
import art from "../styles/img/Art.png";
import MainButton from '../components/UI/button/main/MainButton';
import { useNavigate } from 'react-router-dom';

const Main: FC = () => {
    const navigate = useNavigate();

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
            </div>
        </div>
    );
};

export default Main;