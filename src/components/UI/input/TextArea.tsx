import { TextareaHTMLAttributes, forwardRef } from 'react';
import cl from './TextArea.module.css';


type InputProps = React.DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
>;

const TextArea = forwardRef<HTMLTextAreaElement, InputProps>((props, ref) => (    
    <textarea rows={10} className={cl.text} ref={ref} {...props} />
));

export default TextArea;