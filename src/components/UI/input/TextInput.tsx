import { InputHTMLAttributes, forwardRef } from "react";
import cl from "./TextInput.module.css";


type InputProps = React.DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const TextInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => (    
    <input className={cl.text} ref={ref} {...props} />
));

export default TextInput;