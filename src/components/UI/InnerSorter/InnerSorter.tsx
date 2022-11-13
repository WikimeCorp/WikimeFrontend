import cl from "./InnerSorter.module.css"
import ViewButton from "../button/view/ViewButtons";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { selectSort } from "../../../store/reducers/BtnsSlice";

const InnerSorter = () => {

    const Label: string[] = [ "popular", "new", "rate", "date" ];
    const active = useAppSelector(state => state.btnsReducer.sort);
    const dispatch = useAppDispatch();

    return(
    <div className={cl.innerSorter}>
        <div className={cl.content}>
            <div className={cl.catalog}>
                <div>
                    <span className={cl.catalogSort}>Сортировать по:</span>
                    <button 
                        onClick={() => dispatch(selectSort(Label[0]))}
                        className={active === Label[0] ? 
                            cl.btnSortActive : cl.btnSort}
                    >
                        Популярности
                    </button>
                    <button 
                        onClick={() => dispatch(selectSort(Label[1]))}
                        className={active === Label[1] ? 
                            cl.btnSortActive : cl.btnSort}
                    >
                        Обновлению
                    </button>
                    <button 
                        onClick={() => dispatch(selectSort(Label[2]))}
                        className={active === Label[2] ? 
                            cl.btnSortActive : cl.btnSort}
                    >
                        Рейтингу
                    </button>
                    <button 
                        onClick={() => dispatch(selectSort(Label[3]))}
                        className={active === Label[3] ? 
                            cl.btnSortActive : cl.btnSort}
                    >
                        Дате выхода
                    </button>
                </div>                
                <ViewButton />               
            </div>            
        </div>        
    </div>
    );
};

export default InnerSorter;