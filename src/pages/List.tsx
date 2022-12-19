import { FC } from "react";
import ArticleList from "../components/ArticleList";
import InnerSorter from "../components/InnerSorter/InnerSorter";
import SideBar from "../components/SideBar/SideBar";
import { useAppSelector } from "../hooks/redux";
import "../styles/List.css"

const List: FC = () => {
    const isList = useAppSelector(state => state.btnsReducer.isListView);

    return (
        <div className="list-page">
            <InnerSorter />
            <div className="list-content">                
                <SideBar />
                <ArticleList isList={isList}/>                                                                        
            </div>                       
        </div>
    );
};

export default List;