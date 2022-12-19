import { FC } from "react";
import cl from "./AdminItem.module.css";
import art from "../styles/img/Art.png";
import CrossButton from "./UI/button/cross/CrossButton";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getAdmins, getModerators, resetRole } from "../store/actions/userActions";
import { Admin } from "../types/Admin";
import { useAuth } from "../hooks/useAuth";


const apiHost = process.env.REACT_APP_API_HOST;

type Props = {
    info: Admin;
    role: string;
};

const AdminItem: FC<Props> = ({info, role}) => {

    const dispatch = useAppDispatch();
    const userRole = useAuth().user?.role;

    const ClickHandler = () => {
        dispatch(resetRole(info.id))
            .then(() => {
                if (role === 'admin') {
                    dispatch(getAdmins());
                } else {
                    dispatch(getModerators());
                };
            });
    };

    return (
        <div className={cl.container}>
            <div className={cl.containerAvatar}>
                <div className={cl.avatar}>
                    <img src={`http://${apiHost}${info.avatar}`} alt={art}/>
                </div>
                <h3>{info.nickname}</h3>
            </div>
            {(userRole === 'root' || (userRole === 'admin' && role == 'moderator')) &&
                <CrossButton onClick={ClickHandler}/>
            }
        </div>
    );
};

export default AdminItem;