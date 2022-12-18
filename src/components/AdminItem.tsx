import { FC, useState, useEffect } from "react";
import cl from "./AdminItem.module.css";
import art from "../styles/img/Art.png";
import CrossButton from "./UI/button/cross/CrossButton";
import { useAppDispatch } from "../hooks/redux";
import { getAdminInfo, getAdmins, getModerators, resetRole } from "../store/actions/userActions";
import { IUser } from "../types/IUser";


const apiHost = process.env.REACT_APP_API_HOST;

type Props = {
    userId: number;
};

const AdminItem: FC<Props> = ({userId}) => {

    const dispatch = useAppDispatch();
    const [ admin, setAdmin ] = useState<IUser>();

    useEffect(() => {
        dispatch(getAdminInfo(userId))
            .unwrap()
            .then(result => {
                setAdmin(result);
            });
    }, [])   
    
    if (!admin) {
        return (
            <div className={cl.container}>
                <h3>Loading...</h3>
            </div>
        );
    };

    const ClickHandler = () => {
        dispatch(resetRole(admin.userId))
            .then(() => {
                dispatch(getAdmins());
                dispatch(getModerators());
            });
    };

    return (
        <div className={cl.container}>
            <div className={cl.containerAvatar}>
                <div className={cl.avatar}>
                    <img src={`http://${apiHost}${admin.avatar}`} alt={art}/>
                </div>
                <h3>{admin.nickname}</h3>
            </div>
            <CrossButton onClick={ClickHandler}/>
        </div>
    );
};

export default AdminItem;