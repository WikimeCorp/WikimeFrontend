import { FC } from "react";
import cl from "./Modal.module.css";

interface Props {
    children: React.ReactNode;
    visible: boolean;
    setVisible: (arg: boolean) => void;
}

const Modal: FC<Props> = ({ children, visible, setVisible }) => {

    const rootClasses = [cl.modal];

    if (visible) {
        rootClasses.push(cl.active);
        console.log('VISIBLE')
    };

    return (
        <div className={rootClasses.join('')} onClick={() => setVisible(false)}>
            <div 
                className={cl.content}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
};

export default Modal;