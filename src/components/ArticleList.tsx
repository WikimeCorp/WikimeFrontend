import { FC, useEffect } from "react";
import cl from "./Articles.module.css"
import CardMedium from "./CardMedium";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchArticles } from "../store/action-creators/article";

const ArticleList: FC = () => {
    const dispatch = useAppDispatch()
    const {articles, error, isloading} = useAppSelector(state => state.articleReducer)

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
        <div className={cl.list}>
            {articles.map(article =>
                <CardMedium article={article}/>
            )}
        </div>
    );
};

export default ArticleList;