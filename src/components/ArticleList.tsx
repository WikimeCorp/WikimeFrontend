import { FC, useEffect } from "react";
import cl from "./Articles.module.css"
import CardMedium from "./Cards/CardMedium";
import { useGetAnimesQuery } from "../services/anime";

const ArticleList: FC = () => {
    const { data: animes, isLoading } = useGetAnimesQuery();
    
    if (isLoading) {
        return <div>Loading</div>
    };

    if (!animes) {
        return <div>No articles :(</div>
    };

    return (
        <div className={cl.list}>
            {animes.map(article =>
                <CardMedium key={article.id} article={article}/>
            )}
        </div>
    );
};

export default ArticleList;