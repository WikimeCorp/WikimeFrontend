import { FC, useEffect } from "react";
import cl from "./Articles.module.css"
import { useAppDispatch, useTypedSelector } from "./hooks/useTypedSelector";
import { fetchArticles } from "../store/action-creators/article";
import CardMedium from "./CardMedium";

const ArticleList: FC = () => {
    const {articles, error, loading} = useTypedSelector(state => state.article)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchArticles()) 
    }, [])

    if (loading) {
        return <h1>Loading</h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div>
            {articles.map(article =>
                <CardMedium article={article}/>
            )}
        </div>
    );
};

export default ArticleList;