import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTableCells } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { changeView } from "../../../../store/reducers/ListSlice";
import cl from "./ViewButtons.module.css";

const ViewButton: FC = () => {
    const View = useAppSelector (state => state.listReducer.isListView);
    const dispatch = useAppDispatch();

    return (
        <div className={cl.content}>
            <button onClick={() => dispatch(changeView(true))}>
                <FontAwesomeIcon 
                    icon={faList} 
                    className={
                        View ?
                        cl.iconActive : cl.icon}
                />
            </button>
            <button onClick={() => dispatch(changeView(false))}>
                <FontAwesomeIcon
                    icon={faTableCells} 
                    className={
                        !View ?
                        cl.iconActive : cl.icon}
                />
            </button>
        </div>
    );
};

export default ViewButton;