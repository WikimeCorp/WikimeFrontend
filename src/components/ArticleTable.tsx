import { FC, useEffect } from "react";
import { fetchArticles } from "../store/action-creators/article";
import cl from "./Articles.module.css"
import CardSmall from "./Cards/CardSmall";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useGetAnimesQuery } from "../services/anime";


const ArticleTable: FC = () => {

    const { data: animes, isLoading } = useGetAnimesQuery();
    
    if (isLoading) {
        return <div>Loading</div>
    };

    if (!animes) {
        return <div>No articles :(</div>
    };

    return (
        <div className={cl.table}>
            {animes.map(article =>
                <CardSmall article={article}/>
            )}
        </div>
    );
};

export default ArticleTable;