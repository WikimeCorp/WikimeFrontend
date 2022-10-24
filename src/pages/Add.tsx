import MainButton from "../components/UI/button/main/MainButton";
import "../styles/Add.css";

const Add = () => {
    return (
        <div className="Add-page">
        <form className="add">
            <h1>Название</h1>
            <input type="text" placeholder="Напишите название..."/>
            <h1>Обложка</h1>
            <MainButton>Загрузить изображение</MainButton>
            <h1>Общая информация</h1>
            <hr />
            <div>
                <h2>Оригинальное название</h2>
                <input type="text" placeholder="Напишите название..."/>
                <h2>Жанры</h2>
                <div>
                    <button className="btns-genres">Сёнен</button>
                    <button className="btns-genres">Сёнен-ай</button>
                    <button className="btns-genres">Сэйнен</button>
                    <button className="btns-genres">Сёдзё</button>
                    <button className="btns-genres">Сёдзё-ай</button>
                    <button className="btns-genres">Сёдзё-ай</button>
                    <button className="btns-genres">Дзёсей</button>
                    <button className="btns-genres">Психологическое</button>
                    <button className="btns-genres">Фэнтези</button>
                </div>
                <h2>Режиссер</h2>
                <input type="text" placeholder="Напишите режиссера..."/>
                <h2>Дата выхода</h2>
                <input type="text" placeholder="Напишите дату..."/>
            </div>
            <h1>Арты и кадры</h1>
            <MainButton>Загрузить изображение</MainButton>
            <h1>Описание</h1>
            <input type="text" placeholder="Введите описание..."/>
            <hr />
            <div className="container-save">
                <button className="btn-save">Сохранить</button>
            </div>            
        </form>
        </div>
    );
};

export default Add;
