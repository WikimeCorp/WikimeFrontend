import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../components/UI/button/auth/logout/LogoutButton";
import OpenButton from "../components/UI/button/open_list/OpenButton";
import ViewButton from "../components/UI/button/view/ViewButtons";
import UsersArticleList from "../components/UsersArticleList";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useAuth } from "../hooks/useAuth";
import { changeViewUserLists } from "../store/reducers/BtnsSlice";
import "../styles/UserPage.css";

const apiHost = process.env.REACT_APP_API_HOST;
const apiPort = process.env.REACT_APP_API_PORT;

const UserPage: FC = () => {

    const location = useLocation();
    const auth = useAuth();
    const dispatch = useAppDispatch();

    const { fav: favType, viewed: viewedType, added: addedType } = 
            useAppSelector(state => state.btnsReducer.isListViewUser);
    const { fav, viewed, added } = useAppSelector(state => state.btnsReducer.usersLists);
    const { nickname, avatar } = useAppSelector(state => state.userReduser);

    const imgUrl = (avatar && avatar.includes('images')) ? 
        `http://${apiHost}${auth.user?.avatar}` : avatar;
    
    return(
        <div className="user-page">
            <div className="user-info">
                <div className="user-info-photo">
                    <img src={imgUrl}/>
                </div>
                <h2>{nickname}</h2>
                <Link to={`/update_nickname`} state={{ backgroundLocation: location }}>
                    Изменить никнейм
                </Link>
                <Link to={`/update_avatar`} state={{ backgroundLocation: location }}>
                    Изменить аватар
                </Link>
                <LogoutButton>Выйти</LogoutButton>
            </div>
            <div className="user-content">
                <div className="user-content-item">
                    <div className="user-content-title">
                        <div className="user-content-title-main">
                            <h1>избранное</h1>
                            <OpenButton active={fav} onClick={() => dispatch(changeViewUserLists("fav"))}/>
                        </div>                        
                        { fav && <ViewButton userPage={true} item={"fav"} /> }
                    </div> 
                    { fav && <UsersArticleList isList={favType} ids={auth.user?.favorites!}/>}
                </div>
                <div className="user-content-item">
                    <div className="user-content-title">
                        <div className="user-content-title-main">
                            <h1>просмотренное</h1>
                            <OpenButton active={viewed} onClick={() => dispatch(changeViewUserLists("viewed"))}/>
                        </div>                        
                        { viewed && <ViewButton userPage={true} item={"viewed"}/> }
                    </div>                    
                    { viewed && <UsersArticleList isList={viewedType} ids={auth.user?.watched!}/>}
                </div>
                {auth.user?.role !== "user" &&
                    <div className="user-content-item">
                        <div className="user-content-title">
                            <div className="user-content-title-main">
                                <h1>добавленное</h1>
                                <OpenButton active={added} onClick={() => dispatch(changeViewUserLists("added"))}/>
                            </div>                        
                            { added && <ViewButton userPage={true} item={"added"}/> }
                        </div>                    
                        {/* { added && <ArticleList isList={addedType} />} */}
                    </div>
                }
            </div>
        </div>
    );
};

export default UserPage;