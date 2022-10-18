import { FC } from "react";
import ArticleList from "../components/ArticleList";
import ArticleTable from "../components/ArticleTable";
import InnerSorter from "../components/UI/InnerSorter/InnerSorter";
import SideBar from "../components/UI/SideBar/SideBar";
import { useAppSelector } from "../hooks/redux";
import "../styles/List.css"

const List: FC = () => {
    const View = useAppSelector(state => state.listReducer.isListView);

    return (
        <div className="list-page">
            <InnerSorter />
            <div className="list-content">                
                <SideBar />
                {View ? 
                    <ArticleList />
                    : <ArticleTable />
                }                                                                         
            </div>                       
        </div>
    );
};

export default List;