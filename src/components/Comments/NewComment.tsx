import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import MainButton from '../UI/button/main/MainButton';
import TextArea from '../UI/input/TextArea';
import cl from './NewComment.module.css';

const apiHost = process.env.REACT_APP_API_HOST;

const NewComment: FC = () => {
    const location = useLocation();
    const { user } = useAuth();

    const [comment, setComment] = useState('');

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

    return (
        <div className={cl.main}>
            <div className={cl.user}>
                <div className={cl.avatar}>
                    <img src={`http://${apiHost}${user.avatar}`} alt="avatar" />
                </div>
                <p>{user.nickname}</p>
            </div>
            <div className={cl.content}>
                <TextArea placeholder="Напишите комментарий..." comment onChange={onChange} />
                <MainButton light disabled={!comment}>
                    Отправить
                </MainButton>
            </div>
        </div>
    );
};

export default NewComment;
