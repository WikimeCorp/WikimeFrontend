import { FC, useEffect, useRef } from "react";
import cl from "./Articles.module.css"
import CardMedium from "./Cards/CardMedium";
import { useGetAnimesQuery } from "../services/anime";
import CardSmall from "./Cards/CardSmall";
import { useObserver } from "../hooks/useObserver";

const ArticleList: FC<{isList: boolean}> = ({isList}) => {
    const { data: animes, isLoading } = useGetAnimesQuery();
    const lastElement = useRef<HTMLDivElement>(null!);
    // const observer = useRef<IntersectionObserver | null>(null);
    
    if (!animes) {
        return <div>No articles :(</div>
    };

    // useEffect(() => {
    //     if (isLoading) return;
    //     if (observer.current) observer.current.disconnect();
    //     let callback = function(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    //         // добавить условие, чтобы отрабатывало только тогда, когда № стр < общего числа стр
    //         if (entries[0].isIntersecting) {
    //             // новый запрос
    //         }
    //     };
    //     observer.current = new IntersectionObserver(callback);
    //     observer.current.observe(lastElement.current);
    // }, [isLoading])

    useObserver(lastElement, false, isLoading, () => {})

    return (
        <div className={isList ? cl.list : cl.table}>
            {animes.map(article =>
                isList ?
                <CardMedium key={article.id} article={article}/>
                :
                <CardSmall key={article.id} article={article}/>
            )}
            <div className={cl.last} ref={lastElement} />
        </div>
    );
};

export default ArticleList;