import { NavLink, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useAuth } from "../../../hooks/useAuth";
import { setCode } from "../../../store/reducers/AuthSlice";
import LoginButton from "../button/auth/login/LoginButton";
import LogoutButton from "../button/auth/logout/LogoutButton";
import "./Navbar.css"

const Navbar = () => {
    const auth = useAuth();
    const user = auth.user;

    const dispatch = useAppDispatch();
    const {code, loading} = useAppSelector(state => state.VkAuth);
  
    if (window.location.search.includes('code')) {
      dispatch(setCode());
    };

    if (code && !loading) {
      auth.signin();
    };

    return (
        <div className="navbar">
            <div className="content">
                {/* <p className="logo">WIKIME</p> */}
                <p className="logo">
                    <NavLink to="../">WIKIME</NavLink>
                </p>
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
                    {/* {user ?
                        <LogoutButton>Выйти</LogoutButton>
                        :
                        <LoginButton>Войти</LoginButton>
                    } */}
                    <LoginButton>Войти</LoginButton>
                    <LogoutButton>Выйти</LogoutButton>
                </div>                            
            </div>
            <hr className="line" />
            <Outlet />  
        </div>              
    );
};

export default Navbar;