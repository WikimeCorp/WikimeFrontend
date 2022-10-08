import { FC } from "react";
import CardMedium from "./CardMedium";
import cl from "./Articles.module.css"

const ArticleList: FC = () => {
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