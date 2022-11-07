import TextForm from "../components/UI/Form/TextForm";
import { useAppDispatch } from "../hooks/redux";
import { useAddAnimeMutation } from "../services/anime";
import { clearGenres } from "../store/reducers/GenresSlice";
import "../styles/Add.css";
import { FormTextFields } from "../types/FormTextFields";

const Add = () => {

    const [addArticle, { isError }] = useAddAnimeMutation();
    const dispatch = useAppDispatch();

    const onSubmit = async (formFields: FormTextFields) => {
        if(formFields) {
            await addArticle(formFields).unwrap();
            dispatch(clearGenres());
        }
    };

    return (
        <div className="Add-page">
            <TextForm onSubmit={onSubmit} />
        </div>
    );
};

export default Add;
