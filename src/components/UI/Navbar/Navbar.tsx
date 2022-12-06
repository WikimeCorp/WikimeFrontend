import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import LoginButton from "../button/auth/login/LoginButton";
import LogoutButton from "../button/auth/logout/LogoutButton";
import "./Navbar.css"

const Navbar = () => {
    const user = useAuth().user;

    return (
        <div className="navbar">
            <div className="content">
                <p className="logo">WIKIME</p>
                <div className="links">
                    <NavLink to="/articles" className={({isActive}) => isActive ? 'active' : 'not-active'}>Статьи</NavLink>
                    {user && user.role !== "user" &&
                        <NavLink to="/add" className={({isActive}) => isActive ? 'active' : 'not-active'}>Добавить</NavLink>
                    }
                    {user && user.role === "admin" &&
                        <NavLink to="/admin" className={({isActive}) => isActive ? 'active' : 'not-active'}>Админ</NavLink>
                    }
                </div>
                <div className="contentR">
                    <form>                    
                        <input type="search" placeholder="Поиск"/>
                    </form>
                    {user ?
                        <LogoutButton>Выйти</LogoutButton>
                        :
                        <LoginButton>Войти</LoginButton>
                    }
                    
                </div>                            
            </div>
            <hr className="line" />
            <Outlet />  
        </div>              
    );
};

export default Navbar;