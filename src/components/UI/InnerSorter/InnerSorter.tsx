import cl from "./InnerSorter.module.css"
import ViewButton from "../button/view/ViewButtons";

const InnerSorter = () => {

    return(
    <div className={cl.innerSorter}>
        <div className={cl.content}>
            <div className={cl.catalog}>
                <div>
                    <span>Сортировать по:</span>
                    <a href='#'>Популярности</a>
                    <a href='#'>Обновлению</a>                    
                    <a href='#'>Рейтингу</a>
                    <a href='#'>Дате выхода</a>
                </div>                
                <ViewButton />               
            </div>            
        </div>        
    </div>
    );
};

export default InnerSorter;