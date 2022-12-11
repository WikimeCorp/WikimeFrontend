import { FC } from "react";
import { useForm } from "react-hook-form";
import MainButton from "../../button/main/MainButton";
import TextInput from "../../input/TextInput";
import cl from "./AdminForm.module.css";


type FormData = {
    userID: number;
};

const AdminForm: FC = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({mode: "onBlur"});

    const onSubmit = handleSubmit(data => console.log(data));
    
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