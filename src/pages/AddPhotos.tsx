import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CrossButton from "../components/UI/button/cross/CrossButton";
import MainButton from "../components/UI/button/main/MainButton";
import ImgInput from "../components/UI/input/ImgInput";
import "../styles/Add.css";
import { Art } from "../types/Art";

const AddPhotos: FC = () => {

    const navigate = useNavigate();

    const [poster, setPoster] = useState<Art>();
    const [arts, setArts] = useState<Art[]>([]);
    
    const posterChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (event) => {
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            setPoster({file: img, url: URL.createObjectURL(img)});
        };       
    };

    const artsChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (event) => {
        const data = event.target.files;
        if (data) {
            let newArts: Art[] = [];
            for (let i = 0; i < data.length; i++) {
                newArts.push({file: data[i], url: URL.createObjectURL(data[i])});
            };
            setArts([...arts, ...newArts]);
        };      
    };

    const deleteArt = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, url: string) => {
        e.preventDefault(); 
        if(arts) {
            setArts(arts.filter(a => a.url !== url));
        };
    };


    const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
    }

    return (
        <div className="Add-page">
            <form className="add" onSubmit={onSubmit}>
                <h1>Постер</h1>
                {poster &&
                    <div className="add-poster-wrapper">
                        <img src={poster.url}/>  
                    </div>
                }
                <ImgInput 
                    onChange={posterChange} 
                    text={poster ? "Заменить изображение" : "Загрузить изображение"}
                    name="poster"
                />
                <div className="error">
                    {!poster && <p>Обязательное поле</p>}
                </div>
                <h1>Арты и кадры</h1>
                {arts &&
                    <div className="add-poster-container">
                        {arts.map(art => (
                            <div className="add-poster-wrapper" key={art.url}>
                                <img src={art.url}/>
                                <div className="remove-btn">
                                   <CrossButton onClick={(e) => deleteArt(e, art.url)}/> 
                                </div>                               
                            </div>
                        ))}
                    </div>                  
                }
                <ImgInput
                    onChange={artsChange} 
                    multiple
                    text="Загрузить изображения"
                    name="arts"
                />
                <hr/>
                <div className="container-save">
                    <MainButton type="submit" disabled={!poster}>Добавить статью</MainButton>
                </div> 
            </form>
        </div>
    );
};

export default AddPhotos;
