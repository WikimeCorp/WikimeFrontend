import { useGetAnimesQuery, useGetIdsQuery } from "../services/anime";
import { setTotal } from "../store/reducers/ScrollSlice";
import { useAppDispatch, useAppSelector } from "./redux";


export const useAnimes = () => {

    const dispatch = useAppDispatch();
    const { sort, genres } = useAppSelector(state => state.btnsReducer);

    const { data: ids, isSuccess, isLoading: loadingIds } = useGetIdsQuery({sortBy: sort, genres: genres}); 

    const { data: animes, isLoading: loadingAnimes, isFetching } = useGetAnimesQuery(ids?.slice(0,9)!, 
        {skip: !isSuccess || ids.length === 0});    

    const loading = loadingIds || loadingAnimes || isFetching;  
    const isEmpty = ids?.length === 0 ? true : false;

    if (ids) {
        dispatch(setTotal(ids.length));
    };

    return {animes, loading, isEmpty, ids};
};