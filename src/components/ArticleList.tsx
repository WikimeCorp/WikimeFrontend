import React, { FC, useEffect, useRef, useState } from "react";
import cl from "./Articles.module.css"
import CardMedium from "./Cards/CardMedium";
import { animeAPI, useGetAnimesQuery, useGetIdsQuery } from "../services/anime";
import CardSmall from "./Cards/CardSmall";
import { useObserver } from "../hooks/useObserver";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IAnime } from "../types/IAnime";
import { setData, nextPage, setTotal, addData } from "../store/reducers/ScrollSlice";


const ArticleList: FC<{isList: boolean}> = ({isList}) => {
    
    const { sort: active, genres } = useAppSelector(state => state.btnsReducer);
    const { begin, end } = useAppSelector(state => state.scrollReducer);
    const dispatch = useAppDispatch();

    const { data: ids_animes, isSuccess, isFetching, isLoading: loadingIds } = useGetIdsQuery({sortBy: active, genres: genres});
    
    // useEffect(() => {
    //     if (ids_animes && !isFetching) {
    //         console.log('DO')
    //         dispatch(setTotal(ids_animes?.length));
    //     }     
    // }, [ids_animes])    
 
    const { data: animes, isLoading, isSuccess: success } = useGetAnimesQuery(ids_animes?.slice(0, 5)!, 
        {skip: !isSuccess});

    if (isLoading || loadingIds) {
        return (
            <div className={cl.nothing}>
                <h2>Загрузка...</h2>
            </div> 
        );        
    };

    // const lastElement = useRef<HTMLDivElement>(null);
    // useObserver(lastElement, page < totalPages, isLoading)

    if (ids_animes && ids_animes?.length < 1) {
        return (
            <div className={cl.nothing}>
                <h2>Ничего не найдено</h2>
            </div>            
        )
    }; 

    if (!animes) {
        return (
            <div className={cl.nothing}>
                <h2>Ничего не найдено, но айдишники пришли</h2>
            </div>
        );
    }
    
    return (
        <div className={isList ? cl.list : cl.table}>
            {animes.map(article =>
                isList ?
                <CardMedium key={article!.id} article={article!}/>
                :
                <CardSmall key={article!.id} article={article!}/>
            )}
            {/* <div className={cl.last} ref={lastElement} /> */}
        </div>
    );
};

export default ArticleList;