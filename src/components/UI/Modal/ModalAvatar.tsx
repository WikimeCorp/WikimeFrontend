import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Art } from "../../../types/Art";
import MainButton from "../button/main/MainButton";
import ImgInput from "../input/ImgInput";
import cl from "./Modal.module.css";


const ModalAvatar: FC = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    }

    const [poster, setPoster] = useState<Art>();

    const posterChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (event) => {
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            setPoster({file: img, url: URL.createObjectURL(img)});
        };       
    };

    return (
        <div className={cl.modal} onClick={handleClick}>
            <div 
                className={cl.content}
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Изменение аватара</h2>
                {poster &&
                    <div className={cl.addPosterWrapper}>
                        <img src={poster.url}/>  
                    </div>
                }
                <ImgInput 
                    onChange={posterChange} 
                    text={poster ? "Заменить изображение" : "Загрузить изображение"}
                    name="poster"
                />
                {poster &&
                    <MainButton>Изменить аватар</MainButton>
                }                
            </div>
        </div>
    )
};

export default ModalAvatar;