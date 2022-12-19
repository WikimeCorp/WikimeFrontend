import { FC, useState, useEffect } from "react";
import cl from "./Articles.module.css"
import CardMedium from "./Cards/CardMedium";
import CardSmall from "./Cards/CardSmall";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useGetAnimesQuery, useGetIdsQuery } from "../services/anime";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import MainButton from "./UI/button/main/MainButton";
import Pagination from "./Pagination/Pagination";


const ArticleList: FC<{isList: boolean}> = ({isList}) => {

    const perPage = isList ? 5 : 15;

    const [ page, setPage ] = useState(0);
    const { sort, genres } = useAppSelector(state => state.btnsReducer);

    useEffect(() => {
        setPage(0);
    }, [genres, sort])

    const { 
        data: ids, 
        isSuccess, 
        isLoading: loadingIds,
        isFetching: fetchingIds, 
    } = useGetIdsQuery({sortBy: sort, genres: genres});

    const { 
        data: animes,
        isLoading: loadingAnimes, 
        isFetching: fetchingAnimes 
    } = useGetAnimesQuery((isSuccess && ids.length !== 0) ? ids.slice(page*perPage, (page+1)*perPage) : skipToken);    

    const loading = loadingIds || loadingAnimes || fetchingIds || fetchingAnimes;

    if (loading) {
        return (
            <div className={cl.nothing}>
                <h2>Загрузка...</h2>
            </div> 
        );        
    };

    if (!ids || !animes || ids.length === 0) {
        return (
        <div className={cl.nothing}>
               <h2>Ничего не найдено</h2>
           </div>            
       );
    };

    const total = ids.length;    
    const totalPages = Math.ceil(total / perPage);
    
    return (
        <div className={cl.container}>        
            <div className={isList ? cl.list : cl.table}>
                {animes.map(article =>
                    isList ?
                    <CardMedium key={article.id} article={article}/>
                    :
                    <CardSmall key={article.id} article={article}/>
                )}                             
            </div>
            <div className={cl.btns}>
                <MainButton 
                    onClick={() => {setPage(page - 1); window.scrollTo({ top: 150, behavior: 'smooth' });}} 
                    disabled={ page === 0 }
                    light
                >
                    Назад
                </MainButton>
                <Pagination currentPage={page} totalPages={totalPages} setPage={setPage}/>
                <MainButton
                    onClick={() => {setPage(page + 1); window.scrollTo({ top: 150, behavior: 'smooth' });}}
                    disabled={page === totalPages - 1}
                    light
                >
                    Дальше
                </MainButton>
            </div>            
        </div>
    );
};

export default ArticleList;