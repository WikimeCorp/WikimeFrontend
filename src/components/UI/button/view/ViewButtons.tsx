import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTableCells } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { changeView, changeViewUser } from '../../../../store/reducers/BtnsSlice';
import cl from './ViewButtons.module.css';


interface Props {
    userPage?: boolean;
    item?: string;
}

const ViewButton: FC<Props> = ({userPage, item}) => {

    const context = useAppSelector(state => state.btnsReducer);
    const View = userPage && item ? 
        context.isListViewUser[item as keyof typeof context.isListViewUser]
        : context.isListView;
    const dispatch = useAppDispatch();

    const handleClick = (list : boolean) => {
        userPage && item ?
            dispatch(changeViewUser({newState: list, item}))
            : dispatch(changeView(list));
    };

    return (
        <div className={cl.content}>
            <button onClick={() => handleClick(true)}>
                <FontAwesomeIcon 
                    icon={faList} 
                    className={
                        View ?
                            cl.iconActive : cl.icon}
                />
            </button>
            <button onClick={() => handleClick(false)}>
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