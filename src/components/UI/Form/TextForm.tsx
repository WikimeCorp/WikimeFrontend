import { FC } from "react";
import { FormTextFields } from "../../../types/FormTextFields";
import GenreButton from "../button/genre/GenreButton";
import MainButton from "../button/main/MainButton";
import TextInput from "../input/TextInput";
import Genres from "../../../utils/Genres";
import { useAppSelector } from "../../../hooks/redux";

interface TextFormProps {
    onSubmit: (data: FormTextFields) => void;
};

type FormFields = {
    title: HTMLInputElement;
    originTitle: HTMLInputElement;
    director: HTMLInputElement;
    releaseDate: HTMLInputElement;
    description: HTMLInputElement;
    genres: string[];
};

const TextForm: FC<TextFormProps> = ({ onSubmit }) => {

    const GenresField = useAppSelector(state => state.genresReducer.genres);
    const handleSubmit: React.FormEventHandler<HTMLFormElement & FormFields> = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const { title, originTitle, director, releaseDate, description} = form;

        onSubmit({
            title: title.value,
            originTitle: originTitle.value,
            director: director.value,
            releaseDate: releaseDate.value,
            description: description.value,
            genres: GenresField,
        });
    };

    return (
        <form className="add" onSubmit={handleSubmit}>
            <h1>Название</h1>
            <TextInput type="text" name="title" placeholder="Напишите название..." required />
            <hr />
            <h1>Общая информация</h1>                
            <div>
                <h2>Оригинальное название</h2>
                <TextInput type="text" name="originTitle" placeholder="Напишите название..." required />
                <h2>Жанры</h2>
                <div>
                    {Genres.map((item, idx) =>
                        <GenreButton key={idx}>{item}</GenreButton>
                    )}
                </div>
                <h2>Режиссер</h2>
                <TextInput type="text" name="director" placeholder="Напишите режиссера..." required />
                <h2>Дата выхода</h2>
                <TextInput type="text" name="releaseDate" placeholder="Напишите дату..." required />
            </div>
            <hr />
            <h1>Описание</h1>
            <TextInput type="text" name="description" placeholder="Введите описание..." required />
            <hr />
            <div className="container-save">
                <MainButton type="submit">Далее</MainButton>
            </div>            
        </form>
    );
};

export default TextForm;