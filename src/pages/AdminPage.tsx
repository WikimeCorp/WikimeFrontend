import { FC, useEffect } from "react";
import AdminItem from "../components/AdminItem";
import PlusButton from "../components/UI/button/add_admin/PlusButton";
import AdminForm from "../components/UI/forms/addAdmin/AdminForm";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getAdmins, getModerators } from "../store/actions/userActions";
import { openAdding } from "../store/reducers/BtnsSlice";
import  "../styles/AdminPage.css";

const AdminPage: FC = () => {

    const isOpen = useAppSelector(state => state.btnsReducer.addAdmins);
    const dispatch = useAppDispatch();
    const { admins, moderators } = useAppSelector(state => state.userReduser)

    useEffect(() => {
        dispatch(getAdmins());
        dispatch(getModerators());
    },[])

    return (
        <div className="admin-page">
            <div className="admins">
                <div className="admins-title">
                    <h1>администраторы</h1>
                    <PlusButton onClick={() => dispatch(openAdding(0))}/>
                </div>   
                {isOpen[0] && <AdminForm />}             
                {admins && admins.map((item) =>
                    <AdminItem userId={item} key={item}/>
                )}                
            </div>
            <div className="admins">
                <div className="admins-title">
                    <h1>модераторы</h1>
                    <PlusButton  onClick={() => dispatch(openAdding(1))}/>
                </div>    
                {isOpen[1] && <AdminForm />}            
                {moderators && moderators.map((item) =>
                    <AdminItem userId={item} key={item}/>
                )}                
            </div>
        </div>
    );
};

export default AdminPage;