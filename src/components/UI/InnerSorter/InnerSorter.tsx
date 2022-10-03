import cl from "./InnerSorter.module.css"

const InnerSorter = () => {
    return(
        <div>
            <div className={cl.innerSorter}>
                <div className={cl.catalog}>
                    <span>Сортировать по:</span>
                    <a href='#'>Популярности</a>
                    <a href='#'>Обновлению</a>                    
                    <a href='#'>Рейтингу</a>
                    <a href='#'>Дате выхода</a>
                </div>
            <div className={cl.cardSize}></div>
            </div>
            <hr />
        </div>

    );
};

export default InnerSorter;