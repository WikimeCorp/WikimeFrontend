import { InputHTMLAttributes, forwardRef } from 'react';
import cl from './TextInput.module.css';

const inputStyles = [cl.base, cl.light, cl.search];

interface InputProps extends React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    light?: boolean;
    search?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, InputProps>(({ light, search, ...props }, ref) => {
    const CurrentStyle = search ? inputStyles[2] : light ? inputStyles[1] : inputStyles[0];

    return <input className={CurrentStyle} ref={ref} {...props} />;
});

export default TextInput;
