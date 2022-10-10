import { FC, useEffect } from "react";
import CardMedium from "./CardMedium";
import cl from "./Articles.module.css"
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { fetchArticles } from "../store/action-creators/article";

const ArticleList: FC = () => {
    const {articles, error, loading} = useTypedSelector(state => state.article)
    const dispatch = useDispatch()

    useEffect(() => {
        // TODO!!!!
    }, [dispatch])

    return (
        <div className={cl.list}>
            <CardMedium />
            <CardMedium />
            <CardMedium />
            <CardMedium />
            <CardMedium />
            <CardMedium />
        </div>
    );
};

export default ArticleList;