import MyButton from "../button/MyButton";
import cl from "./Navbar.module.css"

const Navbar = () => {
    return (
        <div className={cl.navbar}>
            <div className={cl.content}>
                <p className={cl.logo}>WIKIME</p>
                <div className={cl.links}>
                    <a href="#">Статьи</a>
                    <a href="#">Добавить</a>
                    <a href="#">Админ</a>
                </div>
                <div className={cl.contentR}>
                    <form>                    
                        <input type="search" placeholder="Поиск"/>
                    </form>
                    <button>Войти</button>
                </div>                            
            </div>
            <hr className={cl.line} />  
        </div>              
    );
};

export default Navbar;