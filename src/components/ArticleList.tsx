import { FC } from "react";
import cl from "./Articles.module.css"
import CardMedium from "./Cards/CardMedium";
import { useGetAnimesQuery } from "../services/anime";
import CardSmall from "./Cards/CardSmall";

const ArticleList: FC<{isList: boolean}> = ({isList}) => {
    const { data: animes, isLoading } = useGetAnimesQuery();
    
    if (isLoading) {
        return <div>Loading</div>
    };

    if (!animes) {
        return <div>No articles :(</div>
    };

    return (
        <div className={isList ? cl.list : cl.table}>
            {animes.map(article =>
                isList ?
                <CardMedium key={article.id} article={article}/>
                :
                <CardSmall key={article.id} article={article}/>
            )}
        </div>
    );
};

export default ArticleList;