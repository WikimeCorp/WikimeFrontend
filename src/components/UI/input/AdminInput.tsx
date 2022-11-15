import { InputHTMLAttributes, forwardRef } from "react";
import cl from "./AdminInput.module.css";


type InputProps = React.DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const AdminInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => (    
    <input className={cl.text} ref={ref} {...props} />
));

export default AdminInput;