import { InputHTMLAttributes, forwardRef } from "react";
import cl from "./TextInput.module.css";


interface InputProps extends React.DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>{
  light?: boolean;
};

const TextInput = forwardRef<HTMLInputElement, InputProps>(({light, ...props}, ref) => (    
    <input 
      className={light ? cl.light : cl.base} 
      ref={ref} 
      {...props} 
    />
));

export default TextInput;