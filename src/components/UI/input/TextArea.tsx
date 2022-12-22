import { TextareaHTMLAttributes, forwardRef } from 'react';
import cl from './TextArea.module.css';

interface InputProps extends React.DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    comment?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(({ comment, ...props }, ref) => (
    <textarea rows={10} className={comment ? cl.comment : cl.text} ref={ref} {...props} />
));

export default TextArea;
