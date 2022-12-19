import { FC, useState } from "react";
import cl from "./Articles.module.css"
import CardMedium from "./Cards/CardMedium";
import { useGetAnimesQuery} from "../services/anime";
import CardSmall from "./Cards/CardSmall";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Pagination from "./Pagination/Pagination";
import MainButton from "./UI/button/main/MainButton";


const UsersArticleList: FC<{isList: boolean, ids: number[]}> = ({isList, ids}) => {
    
    const perPage = isList ? 3 : 9;
    const [ page, setPage ] = useState(0);

    const { 
        data: animes, 
        isLoading
    } = useGetAnimesQuery((ids.length !== 0) ? ids.slice(page*perPage, (page+1)*perPage) : skipToken);

    if (isLoading) {
        return (
            <div className={cl.nothing}>
                <h2>Загрузка...</h2>
            </div> 
        ); 
    };

    if (ids.length === 0 || !animes) {
        return (
            <div className={cl.nothing}>
                <h2>Тут пока пусто...</h2>
            </div>            
        )
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
            {totalPages !== 1 &&
                <div className={cl.btns}>
                    <MainButton 
                        onClick={() => setPage(page - 1)} 
                        disabled={ page === 0 }
                        light
                    >
                        Назад
                    </MainButton>
                    <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} isUserPage/>
                    <MainButton
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages - 1}
                        light
                    >
                        Дальше
                    </MainButton>
                </div>
            }            
        </div>
    );
};

export default UsersArticleList;