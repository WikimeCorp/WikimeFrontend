import { FC } from 'react';
import "../styles/Main.css";
import art from "../styles/img/Art.png";
import MainButton from '../components/UI/button/main/MainButton';
import { useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousel/Carousel';
import CardSmall from '../components/Cards/CardSmall';
import { useGetAnimesQuery, useGetIdsPopularQuery, useGetPopularAnimesQuery } from '../services/anime';

const apiHost = process.env.REACT_APP_API_HOST;
const apiPort = process.env.REACT_APP_API_PORT;

const Main: FC = () => {
    const { data: ids_animes, isSuccess } = useGetIdsPopularQuery();
    const { data: animes, isLoading, error } = useGetPopularAnimesQuery(ids_animes!, {skip: !isSuccess && !ids_animes})
    const navigate = useNavigate(); 

    if (isLoading) {
        return <div>Loading</div>
    };

    if (error || animes === undefined) {
        if (error && 'status' in error) {
            // you can access all properties of `FetchBaseQueryError` here
            const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
      
            return (
              <div>
                <div>An error has occurred:</div>
                <div>{errMsg}</div>
              </div>
            )
          }
          else {
              // you can access all properties of `SerializedError` here
              return <div>{error?.message}</div>
          }
    };

    const slides = Array.from(animes.map(anime => <CardSmall article={anime}/>));

    return(
        <div className='Main-page'>
            <div className='landing'>
                <div className='landing-anime' onClick={() => navigate(`/article/${animes[0].id}`)}>
                    <div className='poster'>
                        <img src={`http://${apiHost}${animes[0].poster}`} alt='poster'/>
                    </div>
                    <span>{animes[0].title}</span>
                </div>
                <div className='landing-info'>
                    <h1>Онлайн энциклопедия аниме</h1>
                    <MainButton onClick={() => navigate('/articles')}>Перейти к статьям</MainButton>
                </div>
            </div>
            <div className='popular'>
                <h1>Популярное</h1>
                <Carousel slides={slides} options={{ slidesToScroll: 4 }}/>                                 
            </div>
        </div>
    );
};

export default Main;