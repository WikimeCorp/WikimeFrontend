import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CrossButton from '../components/UI/button/cross/CrossButton';
import MainButton from '../components/UI/button/main/MainButton';
import ImgInput from '../components/UI/input/ImgInput';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useAddImgMutation, useAddPosterMutation, useDelImgMutation } from '../store/API/anime';
import { cleanAddAnime, setAddAnimeImgs } from '../store/reducers/AddAnimeSlice';
import '../styles/Add.css';
import { Art, Arts } from '../types/Art';

const AddPhotos: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [addPoster, { isSuccess: isSuccessPoster }] = useAddPosterMutation();
    const [addArt, { isSuccess: isSuccessArt }] = useAddImgMutation();
    const [delImg] = useDelImgMutation();

    const { id, poster: posterInStore, images: artsInStore, update } = useAppSelector((state) => state.addAnimeReducer);

    const [poster, setPoster] = useState<Art | undefined>(
        posterInStore ? { file: null, url: posterInStore } : undefined
    );
    const [arts, setArts] = useState<Arts | undefined>(artsInStore ? { files: [], urls: artsInStore } : undefined);
    const [submit, setSubmit] = useState<boolean>(false);

    useEffect(() => {
        if (!arts && submit && isSuccessPoster) {
            dispatch(cleanAddAnime());

            if (update) {
                navigate(-2);
            } else {
                navigate(`../article/${id}`);
            }
        }
    }, [isSuccessPoster]);

    useEffect(() => {
        if (submit && isSuccessArt && isSuccessPoster) {
            dispatch(cleanAddAnime());

            if (update) {
                navigate(-2);
            } else {
                navigate(`../article/${id}`);
            }
        }
    }, [isSuccessArt]);

    useEffect(() => {
        if (update && submit) {
            dispatch(cleanAddAnime());
            navigate(-2);
        }
    }, [submit]);

    const posterChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (event) => {
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            setPoster({ file: img, url: URL.createObjectURL(img) });
        }
    };

    const artsChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (event) => {
        const data = event.target.files;

        if (data) {
            let currentFiles: File[] = arts?.files ? [...arts.files] : [];
            let currentUrls: string[] = arts?.urls ? [...arts.urls] : [];

            for (let i = 0; i < data.length; i++) {
                currentFiles.push(data[i]);
                currentUrls.push(URL.createObjectURL(data[i]));
            }
            setArts({ files: currentFiles, urls: currentUrls });
        }
    };

    const deleteArt = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, idx: number) => {
        e.preventDefault();

        if (arts) {
            let currentFiles = [...arts.files];
            let currentUrls = [...arts.urls];

            if (currentFiles.length !== 0) {
                currentFiles.splice(idx, 1);
            }
            currentUrls.splice(idx, 1);

            if (update && !arts.files[idx] && id) {
                delImg({ id: id, url: arts.urls[idx].split('/').splice(3, 2).join('/') });
            }

            setArts({ files: currentFiles, urls: currentUrls });
        }
    };

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (!update && poster && poster.file && id) {
            const posterForm = new FormData();
            posterForm.append('file', poster.file);
            addPoster({ id, imgFile: posterForm });

            if (arts) {
                arts.files.map((art) => {
                    const artForm = new FormData();
                    artForm.append('file', art);
                    addArt({ id, imgFile: artForm });
                });
            }
        }

        if (update && id) {
            if (poster && poster.file) {
                const posterForm = new FormData();
                posterForm.append('file', poster.file);
                addPoster({ id, imgFile: posterForm });
            }

            if (arts && arts.files.length !== 0) {
                arts.files.map((art) => {
                    const artForm = new FormData();
                    artForm.append('file', art);
                    addArt({ id, imgFile: artForm });
                });
            }
        }

        setSubmit(true);
    };

    const prevClick = () => {
        dispatch(setAddAnimeImgs({ poster: poster?.url, arts: arts?.urls }));
        navigate('/add');
    };

    return (
        <div className="Add-page">
            <form className="add" onSubmit={onSubmit}>
                <h1>Постер</h1>
                {poster && (
                    <div className="add-poster-wrapper">
                        <img src={poster.url} alt="poster" />
                    </div>
                )}
                <ImgInput
                    onChange={posterChange}
                    text={poster ? 'Заменить изображение' : 'Загрузить изображение'}
                    name="poster"
                />
                <div className="error">{!poster && <p>Обязательное поле</p>}</div>
                <h1>Арты и кадры</h1>
                {arts && (
                    <div className="add-poster-container">
                        {arts.urls.map((art, idx) => (
                            <div className="add-poster-wrapper" key={art}>
                                <img src={art} alt="art" />
                                <div className="remove-btn">
                                    <CrossButton onClick={(e) => deleteArt(e, idx)} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <ImgInput onChange={artsChange} multiple text="Загрузить изображения" name="arts" />
                <hr />
                <div className="container-save">
                    <MainButton onClick={prevClick}>Назад</MainButton>
                    <MainButton type="submit" disabled={!poster}>
                        {update ? 'Редактировать' : 'Добавить статью'}
                    </MainButton>
                </div>
            </form>
        </div>
    );
};

export default AddPhotos;
