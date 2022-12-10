import { FC } from "react";
import ArticleList from "../components/ArticleList";
import LogoutButton from "../components/UI/button/auth/logout/LogoutButton";
import OpenButton from "../components/UI/button/open_list/OpenButton";
import ViewButton from "../components/UI/button/view/ViewButtons";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useAuth } from "../hooks/useAuth";
import { changeViewUserLists } from "../store/reducers/BtnsSlice";
import "../styles/UserPage.css";

const apiHost = process.env.REACT_APP_API_HOST;
const apiPort = process.env.REACT_APP_API_PORT;

const UserPage: FC = () => {
    const auth = useAuth();
    
    const { fav: favType, viewed: viewedType, added: addedType } = 
            useAppSelector(state => state.btnsReducer.isListViewUser);
    const { fav, viewed, added } = useAppSelector(state => state.btnsReducer.usersLists);
    const dispatch = useAppDispatch();
    
    // if (isLoading) {
    //     return <div>Loading</div>
    // };

    // if (!animes) {
    //     return <div>No articles :(</div>
    // };

    return(
        <div className="user-page">
            <div className="user-info">
                <div className="user-info-photo">
                    <img src={`http://${apiHost}${auth.user?.avatar}`}/>
                </div>
                <h2>{auth.user?.nickname}</h2>
                <a href="#">Изменить никнейм</a>
                <a href="#">Изменить аватар</a>
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
                    {/* { fav && <ArticleList isList={favType}/>} */}
                </div>
                <div className="user-content-item">
                    <div className="user-content-title">
                        <div className="user-content-title-main">
                            <h1>просмотренное</h1>
                            <OpenButton active={viewed} onClick={() => dispatch(changeViewUserLists("viewed"))}/>
                        </div>                        
                        { viewed && <ViewButton userPage={true} item={"viewed"}/> }
                    </div>                    
                    {/* { viewed && <ArticleList isList={viewedType} />} */}
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