import { FC, useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { useAuth } from '../../hooks/useAuth';
import { getUserById } from '../../store/actions/userActions';
import { useDelCommentMutation } from '../../store/API/comments';
import { IUser } from '../../types/IUser';
import { TComment } from '../../types/TComment';
import { formatText } from '../../utils/formatText';
import CrossButton from '../UI/button/cross/CrossButton';
import cl from './Comment.module.css';

const apiHost = process.env.REACT_APP_API_HOST;

const Comment: FC<{ comment: TComment }> = ({ comment }) => {
    const { user } = useAuth();
    const dispatch = useAppDispatch();
    const [author, setAuthor] = useState<IUser>();

    const [delComment] = useDelCommentMutation();

    useEffect(() => {
        dispatch(getUserById(comment.author))
            .unwrap()
            .then((result) => {
                setAuthor(result);
            });
    }, [comment.author]);

    if (!author) {
        return <div>автор не найден</div>;
    }

    const isCanDelete = user && user.role !== 'user' && user.role !== 'moderator';

    const deleteClick = async () => {
        try {
            await delComment(comment.id);
        } catch (error) {
            throw error;
        }
    };

    return (
        <div className={cl.main}>
            <div className={cl.header}>
                <div className={cl.user}>
                    <div className={cl.avatar}>
                        <img src={`http://${apiHost}${author.avatar}`} alt="avatar" />
                    </div>
                    <p>{author?.nickname}</p>
                </div>
                {isCanDelete && <CrossButton isComment={true} onClick={deleteClick} />}
                {/* <div className={cl.date}>
                    <p>18.09.2022 в 03:38</p>
                </div> */}
            </div>
            <hr />
            <div className={cl.content}>{formatText(comment.message)}</div>
        </div>
    );
};

export default Comment;
