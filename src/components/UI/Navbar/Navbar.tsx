import { NavLink, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useAuth } from "../../../hooks/useAuth";
import { setCode } from "../../../store/reducers/AuthSlice";
import LoginButton from "../button/auth/login/LoginButton";
import "./Navbar.css"

const apiHost = process.env.REACT_APP_API_HOST;

const Navbar = () => {
    const auth = useAuth();
    const user = auth.user;

    const dispatch = useAppDispatch();
    const {code, loading} = useAppSelector(state => state.VkAuth);
    const { avatar } = useAppSelector(state => state.userReduser);
  
    if (window.location.search.includes('code')) {
      dispatch(setCode());
    };

    if (code && !loading) {
      auth.signin();
    };

    const imgUrl = (user && avatar && avatar.includes('images')) ? 
        `http://${apiHost}${auth.user?.avatar}` : avatar;

    return (
        <div className="navbar">
            <div className="content">
                <p className="logo">
                    <NavLink to="../">WIKIME</NavLink>
                </p>
                <div className="links">
                    <NavLink to="/articles" className={({isActive}) => isActive ? 'active' : 'not-active'}>Статьи</NavLink>
                    {user && user.role !== "user" &&
                        <NavLink to="/add" className={({isActive}) => isActive ? 'active' : 'not-active'}>Добавить</NavLink>
                    }
                    {user && user.role !== "user" && user.role !== "moderator" &&
                        <NavLink to="/admin" className={({isActive}) => isActive ? 'active' : 'not-active'}>Админ</NavLink>
                    }
                </div>
                <div className="contentR">
                    <form>                    
                        <input type="search" placeholder="Поиск"/>
                    </form>
                    {user && user.avatar ?
                        <NavLink to='/user' className="avatar">
                            <img src={imgUrl} />
                        </NavLink>
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