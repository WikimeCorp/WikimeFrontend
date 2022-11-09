import { FC } from "react";
import { FormTextFields } from "../../../types/FormTextFields";
import GenreButton from "../button/genre/GenreButton";
import MainButton from "../button/main/MainButton";
import TextInput from "../input/TextInput";
import Genres from "../../../utils/Genres";
import { useAppSelector } from "../../../hooks/redux";
import { useForm, SubmitHandler } from "react-hook-form";
import cl from "./TextForm.module.css";
import TextArea from "../input/TextArea";


interface TextFormProps {
    onSubmit: (data: FormTextFields) => void;
};

const TextForm: FC<TextFormProps> = ({ onSubmit }) => {

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
      } = useForm<FormTextFields>({mode: "onBlur"});

    const GenresField = useAppSelector(state => state.genresReducer.genres);

    // const handleSubmitMain: React.FormEventHandler<HTMLFormElement & FormFields> = (event) => {
    //     event.preventDefault();
    //     const form = event.currentTarget;
    //     const { title, originTitle, director, releaseDate, description} = form;
    //     onSubmit({
    //         title: title.value,
    //         originTitle: originTitle.value,
    //         director: director.value,
    //         releaseDate: releaseDate.value,
    //         description: description.value,
    //         genres: GenresField,
    //     });
    // };

    const handleSubmitMain: SubmitHandler<FormTextFields> = (data) => {
        onSubmit({
            title: data.title,
            originTitle: data.originTitle,
            director: data.director,
            releaseDate: data.releaseDate,
            description: data.description,
            genres: GenresField,
        });
    };

    return (
        <form className="add" onSubmit={handleSubmit(handleSubmitMain)}>

            <h1>Название</h1>
            <TextInput 
                placeholder="Напишите название..." 
                {...register("title", {required: "Обязательное поле"})}
            />
            <div className={cl.error}>
                {errors?.title && <p>{errors?.title?.message || "Error!"}</p>}
            </div>
            <hr />

            <h1>Общая информация</h1>                
            <div>
                <h2>Оригинальное название</h2>
                <TextInput placeholder="Напишите название..." 
                    {...register("originTitle", {required: "Обязательное поле"})}
                />
                <div className={cl.error}>
                    {errors?.originTitle && <p>{errors?.originTitle?.message || "Error!"}</p>}
                </div>
                <h2>Жанры</h2>
                <div>
                    {Genres.map((item, idx) =>
                        <GenreButton key={idx}>{item}</GenreButton>
                    )}
                </div>
                <h2>Режиссер</h2>
                <TextInput placeholder="Напишите режиссера..." 
                    {...register("director", {required: "Обязательное поле"})}
                />
                <div className={cl.error}>
                    {errors?.director && <p>{errors?.director?.message || "Error!"}</p>}
                </div>
                <h2>Дата выхода</h2>
                <TextInput placeholder="XX.XX.XXXX" 
                    {...register("releaseDate", {required: "Обязательное поле", pattern: /^\d{2}([./-])\d{2}\1\d{4}$/})}
                />
                <div className={cl.error}>
                    {errors?.releaseDate && <p>{errors?.releaseDate?.message ||  "Неверный ввод"}</p>}
                </div>
            </div>
            <hr />

            <h1>Описание</h1>
            <TextArea placeholder="Введите описание..." 
                {...register("description", {required: "Обязательное поле"})}
            />
            <div className={cl.error}>
                {errors?.description && <p>{errors?.description?.message || "Error!"}</p>}
            </div>
            <hr />
            <div className="container-save">
                <MainButton type="submit" disabled={!isValid}>Далее</MainButton>
            </div>            
        </form>
    );
};

export default TextForm;