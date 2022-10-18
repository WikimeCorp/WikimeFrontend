import { FC, useEffect } from "react";
import { fetchArticles } from "../store/action-creators/article";
import cl from "./Articles.module.css"
import CardSmall from "./CardSmall";
import { useAppDispatch, useAppSelector } from "../hooks/redux";


const ArticleTable: FC = () => {
    const {articles, error, isloading} = useAppSelector(state => state.articleReducer)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchArticles()) 
    }, [])

    if (isloading) {
        return <h1>Loading</h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div className={cl.table}>
            {articles.map(article =>
                <CardSmall article={article}/>
            )}
        </div>
    );
};

export default ArticleTable;