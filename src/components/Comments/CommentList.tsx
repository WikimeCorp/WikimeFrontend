import { FC } from 'react';
import Comment from './Comment';
import cl from './Comment.module.css';

const CommentList: FC = () => {
    return (
        <div className={cl.container}>
            {[0, 1].map((item, idx) => (
                <Comment key={idx} />
            ))}
        </div>
    );
};

export default CommentList;
