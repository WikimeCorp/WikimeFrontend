import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormTextFields } from '../../../types/FormTextFields';
import GenreButton from '../../UI/button/genre/GenreButton';
import MainButton from '../../UI/button/main/MainButton';
import TextInput from '../../UI/input/TextInput';
import Genres from '../../../utils/Genres';
import { useAppSelector } from '../../../hooks/redux';
import TextArea from '../../UI/input/TextArea';
import { IAnime } from '../../../types/IAnime';
import cl from './TextForm.module.css';

interface TextFormProps {
    onSubmit: (data: Partial<IAnime>) => void;
}

const TextForm: FC<TextFormProps> = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid }
    } = useForm<FormTextFields>({ mode: 'all' });

    const {
        id,
        genres,
        title,
        originTitle,
        description,
        releaseDate,
        director
    } = useAppSelector((state) => state.addAnimeReducer);

    const navigate = useNavigate();

    if (id !== undefined) {
        setValue('title', title!);
        setValue('originTitle', originTitle!);
        setValue('director', director!);
        setValue('description', description!);
    }

    const handleSubmitMain: SubmitHandler<FormTextFields> = (data) => {
        onSubmit({
            title: data.title,
            originTitle: data.originTitle,
            director: data.director,
            releaseDate: Math.floor(data.releaseDate.getTime() / 1000),
            description: data.description,
            genres: genres
        });

        navigate('/add/photos');
    };

    return (
        <form className="add" onSubmit={handleSubmit(handleSubmitMain)}>
            <h1>Название</h1>
            <TextInput
                placeholder="Напишите название..."
                {...register('title', { required: 'Обязательное поле' })}
            />
            <div className={cl.error}>
                {errors?.title && <p>{errors?.title?.message || 'Error!'}</p>}
            </div>
            <hr />

            <h1>Общая информация</h1>
            <div>
                <h2>Оригинальное название</h2>
                <TextInput
                    placeholder="Напишите название..."
                    {...register('originTitle', {
                        required: 'Обязательное поле'
                    })}
                />
                <div className={cl.error}>
                    {errors?.originTitle && (
                        <p>{errors?.originTitle?.message || 'Error!'}</p>
                    )}
                </div>
                <h2>Жанры</h2>
                <div>
                    {Genres.map((item, idx) => (
                        <GenreButton key={idx}>{item}</GenreButton>
                    ))}
                </div>
                <h2>Режиссер</h2>
                <TextInput
                    placeholder="Напишите режиссера..."
                    {...register('director', { required: 'Обязательное поле' })}
                />
                <div className={cl.error}>
                    {errors?.director && (
                        <p>{errors?.director?.message || 'Error!'}</p>
                    )}
                </div>
                <h2>Дата выхода</h2>
                <TextInput
                    type="date"
                    {...register('releaseDate', {
                        required: 'Обязательное поле',
                        valueAsDate: true
                    })}
                    defaultValue={
                        releaseDate &&
                        new Date((releaseDate as number) * 1000)
                            .toISOString()
                            .substring(0, 10)
                    }
                />
                <div className={cl.error}>
                    {errors?.releaseDate && (
                        <p>{errors?.releaseDate?.message || 'Неверный ввод'}</p>
                    )}
                </div>
            </div>
            <hr />

            <h1>Описание</h1>
            <TextArea
                placeholder="Введите описание..."
                {...register('description', { required: 'Обязательное поле' })}
            />
            <div className={cl.error}>
                {errors?.description && (
                    <p>{errors?.description?.message || 'Error!'}</p>
                )}
            </div>
            <hr />
            <div className="container-save">
                <MainButton type="submit" disabled={!isValid}>
                    Далее
                </MainButton>
            </div>
        </form>
    );
};

export default TextForm;
