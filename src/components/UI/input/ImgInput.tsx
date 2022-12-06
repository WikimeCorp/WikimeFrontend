import { InputHTMLAttributes, forwardRef } from "react";
import cl from "./ImgInput.module.css";


interface InputProps extends React.DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
    text: string;
};

const ImgInput = forwardRef<HTMLInputElement, InputProps>(({text, ...props}, ref) => ( 
    <label className={cl.inputFile}>
        <input type="file" accept="image/*,.png,.jpg" ref={ref} {...props} />
        <span>{text}</span>
    </label>   
    
));

export default ImgInput;