import { FC } from 'react';
import { useGetCommentsQuery } from '../../store/API/comments';
import Comment from './Comment';
import cl from './Comment.module.css';

const CommentList: FC<{ animeId: number }> = ({ animeId }) => {
    const { data: comments, isLoading, isSuccess } = useGetCommentsQuery(animeId);

    if (isLoading) {
        return (
            <div className={cl.someError}>
                <p>Загрузка...</p>
            </div>
        );
    }

    if (!comments || !isSuccess) {
        return (
            <div className={cl.someError}>
                <p>Произошла ошибка при загрузке комментариев</p>
            </div>
        );
    }
    if (comments.length === 0) {
        return (
            <div className={cl.someError}>
                <p>Комментариев пока нет</p>
            </div>
        );
    }

    return (
        <div className={cl.container}>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default CommentList;
