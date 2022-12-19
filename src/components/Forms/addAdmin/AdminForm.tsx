import { FC } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../hooks/redux";
import { getAdmins, getModerators, updateRole } from "../../../store/actions/userActions";
import { openAdding } from "../../../store/reducers/BtnsSlice";
import MainButton from "../../UI/button/main/MainButton";
import TextInput from "../../UI/input/TextInput";
import cl from "./AdminForm.module.css";


type FormData = {
    userID: number;
};

const AdminForm: FC<{role: string}> = ({role}) => {

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm<FormData>({mode: "onBlur"});

    const onSubmit = handleSubmit (data => {
        dispatch(updateRole({id: data.userID, role: role}))
            .unwrap()
            .then((promiseResult) => {
                if (role === 'admin') {                    
                    dispatch(openAdding(0));
                } else {                    
                    dispatch(openAdding(1));
                }; 
                dispatch(getAdmins());
                dispatch(getModerators());
            })
            .catch((rejectedValue) => {
                setError('userID', {type: 'custom', message: rejectedValue.error_message})
            });
    });
    
    return (
        <form className={cl.container} onSubmit={onSubmit}>
            <TextInput
                light
                placeholder="Введите id пользователя..." 
                {...register("userID", { required: {value: true, message: "Обязательное поле"}, pattern: { value: /\d+/, message: "id содержит только цифры"} })}
            />
            <div className={cl.error}>
                {errors?.userID && <p role="alert">{errors?.userID?.message}</p>}
            </div>            
            <MainButton type="submit" disabled={!isValid}>Добавить</MainButton>            
        </form>
    );
};

export default AdminForm;