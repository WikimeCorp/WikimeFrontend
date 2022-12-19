import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { updateNickname } from "../../store/actions/userActions";
import MainButton from "../UI/button/main/MainButton";
import TextInput from "../UI/input/TextInput";
import cl from "./Modal.module.css";


const ModalNickname: FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [nickname, setNickname] = useState<string>();

    const handleClick = () => {  
        navigate(-1);
    }

    const updateClick = () => {     
        if (nickname) {
            dispatch(updateNickname(nickname));
            setNickname(undefined);
        }
        handleClick();
    };

    return (
        <div className={cl.modal} onClick={handleClick}>
            <div 
                className={cl.content}
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Изменение никнейма</h2>
                <TextInput 
                    onChange={e => setNickname(e.target.value)}
                    placeholder="Введите новый никнейм..." 
                    light
                ></TextInput>
                {nickname &&
                    <MainButton onClick={updateClick}>Изменить никнейм</MainButton>
                }                
            </div>
        </div>
    )
};

export default ModalNickname;