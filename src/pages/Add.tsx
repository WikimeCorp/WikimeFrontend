import TextForm from "../components/UI/Form/TextForm";
import { useAppDispatch } from "../hooks/redux";
import { clearGenres } from "../store/reducers/GenresSlice";
import "../styles/Add.css";
import { FormTextFields } from "../types/FormTextFields";

const Add = () => {

    const onSubmit = (formFields: FormTextFields) => {
        console.log(formFields);
    };

    return (
        <div className="Add-page">
            <TextForm onSubmit={onSubmit} />
        </div>
    );
};

export default Add;
