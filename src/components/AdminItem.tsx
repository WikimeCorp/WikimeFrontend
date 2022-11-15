import { FC } from "react";
import cl from "./AdminItem.module.css";
import art from "../styles/img/Art.png";
import CrossButton from "./UI/button/cross/CrossButton";

const AdminItem: FC = () => {
    return(
        <div className={cl.container}>
            <div className={cl.containerAvatar}>
                <div className={cl.avatar}>
                    <img src={art} />
                </div>
                <h3>Murimonai</h3>
            </div>
            <CrossButton />
        </div>
    );
};

export default AdminItem;