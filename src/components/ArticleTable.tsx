import { FC } from "react";
import cl from "./Articles.module.css"
import CardSmall from "./CardSmall";

const ArticleTable: FC = () => {
    return (
        <div className={cl.table}>
            <CardSmall />
            <CardSmall />
            <CardSmall />
            <CardSmall />
            <CardSmall />
            <CardSmall />
            <CardSmall />
            <CardSmall />
            <CardSmall />
            <CardSmall />
            <CardSmall />
            <CardSmall />
            <CardSmall />
        </div>
    );
};

export default ArticleTable;