import MainButton from "../button/main/MainButton";
import "./Navbar.css"

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="content">
                <p className="logo">WIKIME</p>
                <div className="links">
                    <a href="#">Статьи</a>
                    <a href="#">Добавить</a>
                    <a href="#">Админ</a>
                </div>
                <div className="contentR">
                    <form>                    
                        <input type="search" placeholder="Поиск"/>
                    </form>
                    <button>Войти</button>
                </div>                            
            </div>
            <hr className="line" />  
        </div>              
    );
};

export default Navbar;