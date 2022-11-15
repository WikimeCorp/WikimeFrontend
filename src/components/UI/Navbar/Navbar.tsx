import { NavLink, Outlet } from "react-router-dom";
import LoginButton from "../button/auth/login/LoginButton";
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
                    <LoginButton>Войти</LoginButton>
                </div>                            
            </div>
            <hr className="line" />
            <Outlet />  
        </div>              
    );
};

export default Navbar;