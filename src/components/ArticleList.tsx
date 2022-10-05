import { FC } from "react";
import ArticleListItem from "./ArticleListItem";
import InnerSorter from "./UI/InnerSorter/InnerSorter";
import SideBar from "./UI/SideBar/SideBar";

const ArticleList: FC = () => {
    return (
        <div style={{ marginLeft: "auto", marginRight: "auto"}}>
            <ArticleListItem />
            <ArticleListItem />
            <ArticleListItem />
            <ArticleListItem />
            <ArticleListItem />
            <ArticleListItem />
        </div>
    );
};

export default ArticleList;