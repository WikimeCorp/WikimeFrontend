import { FC } from "react";
import { useNavigate } from "react-router-dom";
import TextForm from "../components/UI/forms/addArticle/TextForm";
import { useAppDispatch } from "../hooks/redux";
import { useAddAnimeMutation } from "../services/anime";
import { clearGenres } from "../store/reducers/GenresSlice";
import "../styles/Add.css";
import { FormTextFields } from "../types/FormTextFields";

const Add: FC = () => {

    const [addArticle, { isError }] = useAddAnimeMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (formFields: FormTextFields) => {
        if(formFields) {
            try {
                const payload = await addArticle(formFields).unwrap();
                dispatch(clearGenres());
                console.log('fulfilled', payload)
            } catch (error) {
                console.error('rejected', error);
            }
            navigate('/add/photos');
        }   
    };

    return (
        <div className="Add-page">
            <TextForm onSubmit={onSubmit} />
        </div>
    );
};

export default Add;
