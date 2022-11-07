import { ForwardRefRenderFunction, InputHTMLAttributes, forwardRef } from "react";
import cl from "./TextInput.module.css";


interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name?: string;
    ref: string;
};

const Input: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = ({ name, ...otherProps }, ref) => {
    return (
        <label>
            <input 
                className={cl.text}
                {...otherProps}
                name={name}
                ref={ref}            
            />
        </label>
    );
};

const TextInput = forwardRef(Input);

export default TextInput;