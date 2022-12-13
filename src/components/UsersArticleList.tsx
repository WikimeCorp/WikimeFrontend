import { FC } from "react";
import cl from "./Articles.module.css"
import CardMedium from "./Cards/CardMedium";
import { useGetAnimesQuery} from "../services/anime";
import CardSmall from "./Cards/CardSmall";
import { useAppDispatch, useAppSelector } from "../hooks/redux";


const UsersArticleList: FC<{isList: boolean, ids: number[]}> = ({isList, ids}) => {
    
    const { begin, end } = useAppSelector(state => state.scrollReducer);
    const dispatch = useAppDispatch();    
   
    const { data: animes, isLoading, isSuccess: success, refetch } = 
        useGetAnimesQuery(ids.slice(0, 20), {skip: ids.length < 1});

    if (isLoading) {
        <div>loading</div>
    };

    if (ids.length < 1) {
        return (
            <div className={cl.nothing}>
                <h2>Тут пока пусто...</h2>
            </div>            
        )
    }; 

    if (animes === undefined) {
        return <div>No animes</div>
    }
    
    return (
        <div className={isList ? cl.list : cl.table}>
            {animes!.map(article =>
                isList ?
                <CardMedium key={article!.id} article={article!}/>
                :
                <CardSmall key={article!.id} article={article!}/>
            )}
        </div>
    );
};

export default UsersArticleList;