import { FC } from "react";
import AdminItem from "../components/AdminItem";
import MainButton from "../components/UI/button/main/MainButton";
import AdminForm from "../components/UI/forms/addAdmin/AdminForm";
import TextInput from "../components/UI/input/TextInput";
import  "../styles/AdminPage.css";

const AdminPage: FC = () => {

    return (
        <div className="admin-page">
            <div className="admins">
                <h1>администраторы</h1>
                {[0,1,2,3,4].map((item) =>
                    <AdminItem key={item}/>)}
                <AdminForm />
            </div>
            <div className="admins">
                <h1>модераторы</h1>
                {[0,1,2,3,4,5,6].map((item) =>
                    <AdminItem key={item}/>)}
                <AdminForm />
            </div>
        </div>
    );
};

export default AdminPage;