import { FC } from "react";
import ArticleList from "../components/ArticleList";
import InnerSorter from "../components/UI/InnerSorter/InnerSorter";
import SideBar from "../components/UI/SideBar/SideBar";
import "../styles/List.css"

const List: FC = () => {
    return (
        <div className="list-page">
            <InnerSorter />
            <div className="list-content">
                <SideBar />
                <ArticleList />                                             
            </div>                       
        </div>
    );
}

export default List;