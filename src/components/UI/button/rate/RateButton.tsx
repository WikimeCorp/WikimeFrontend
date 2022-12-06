import { ButtonHTMLAttributes, FC, useState } from 'react';
import cl from "./RateButton.module.css"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

const RateButton: FC<Props> = ({children, ...props}) => {

    const [ isActive, setActive ] = useState(false);
    const [ rate, setRate ] = useState<number | null>(null);

    return (
        !rate ?
            <div className={cl.container}>
                <button 
                    onClick={() => setActive(!isActive)} 
                    className={isActive ? cl.active : cl.main} 
                    {...props}
                >
                    {children}
                </button>
                {isActive &&
                    <div className={cl.marks}>
                        {[ 1, 2, 3, 4, 5 ].map((item) => 
                            <button 
                                key={item} 
                                className={cl.marksItem}
                                onClick={() => setRate(item)}
                            >
                                {item}
                            </button>
                        )}
                    </div> 
                }           
            </div>
        :   
            <div className={cl.container}>
                <div className={cl.info}>
                    <p>Ваша оценка:</p>
                    <button className={cl.userMark} disabled>{rate}</button>
                </div>
                <button className={cl.change} onClick={() => setRate(null)}>Изменить</button>
            </div>
    
    );
};

export default RateButton;