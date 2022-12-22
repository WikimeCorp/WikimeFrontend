import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAddCommentMutation } from '../../store/API/comments';
import MainButton from '../UI/button/main/MainButton';
import TextArea from '../UI/input/TextArea';
import cl from './NewComment.module.css';

const apiHost = process.env.REACT_APP_API_HOST;

const NewComment: FC<{ animeId: number }> = ({ animeId }) => {
    const location = useLocation();
    const { user } = useAuth();

    const [comment, setComment] = useState('');
    const [addComment] = useAddCommentMutation();

    if (!user) {
        return (
            <div className={cl.notUser}>
                <Link to={`/signin`} state={{ backgroundLocation: location }}>
                    <MainButton light>Написать комментарий</MainButton>
                </Link>
            </div>
        );
    }

    const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    const onClick = async () => {
        try {
            await addComment({ message: comment, animeId });
        } catch (error) {
            throw error;
        }
        setComment('');
    };

    return (
        <div className={cl.main}>
            <div className={cl.user}>
                <div className={cl.avatar}>
                    <img src={`http://${apiHost}${user.avatar}`} alt="avatar" />
                </div>
                <p>{user.nickname}</p>
            </div>
            <div className={cl.content}>
                <TextArea placeholder="Напишите комментарий..." comment onChange={onChange} value={comment} />
                <MainButton light disabled={!comment} onClick={onClick}>
                    Отправить
                </MainButton>
            </div>
        </div>
    );
};

export default NewComment;
