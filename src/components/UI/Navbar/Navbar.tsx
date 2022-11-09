import { NavLink, Outlet } from "react-router-dom";
import MainButton from "../button/main/MainButton";
import "./Navbar.css"

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="content">
                <p className="logo">WIKIME</p>
                <div className="links">
                    <NavLink to="/articles" className={({isActive}) => isActive ? 'active' : 'not-active'}>Статьи</NavLink>
                    <NavLink to="/add" className={({isActive}) => isActive ? 'active' : 'not-active'}>Добавить</NavLink>
                    <NavLink to="/admin" className={({isActive}) => isActive ? 'active' : 'not-active'}>Админ</NavLink>
                </div>
                <div className="contentR">
                    <form>                    
                        <input type="search" placeholder="Поиск"/>
                    </form>
                    <button>Войти</button>
                </div>                            
            </div>
            <hr className="line" />
            <Outlet />  
        </div>              
    );
};

export default Navbar;