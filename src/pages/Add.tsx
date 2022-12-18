import { FC } from "react";
import TextForm from "../components/UI/forms/addArticle/TextForm";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useAddAnimeMutation } from "../services/anime";
import { setAddAnime, setAnimeId } from "../store/reducers/AddAnimeSlice";
import "../styles/Add.css";
import { IAnime } from "../types/IAnime";

const Add: FC = () => {

    const [ addArticle, {isLoading} ] = useAddAnimeMutation();
    const dispatch = useAppDispatch();
   
    const onSubmit = async (formFields: Partial<IAnime>) => {
        if (formFields) {
            dispatch(setAddAnime(formFields))
            try {
                const payload = await addArticle(formFields).unwrap();
                dispatch(setAnimeId(payload.animeId));
                                
            } catch (error) {
                console.error('rejected', error);
            };             
        };
    };

    return (
        <div className="Add-page">
            <TextForm onSubmit={onSubmit} />
        </div>
    );
};

export default Add;
