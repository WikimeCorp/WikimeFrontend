import { ButtonHTMLAttributes, FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { useAddRatingMutation } from '../../../../store/API/anime';
import { addRate } from '../../../../store/reducers/UserSlice';
import cl from './RateButton.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	animeId: number;
	children?: React.ReactNode;
}

const RateUserButton: FC<Props> = ({ animeId, children, ...props }) => {
    const dispatch = useAppDispatch();

    const rated = useAppSelector((state) => state.userReduser.rated);
    const isRate = rated.find((item) => item.id === animeId);
    const [isActive, setActive] = useState(false);
    const [rate, setRate] = useState<number | null>(isRate ? isRate.Rate : null);

    const [addRating] = useAddRatingMutation();

    const RateClick = (rate: number) => {
        setRate(rate);
        dispatch(addRate({ id: animeId, Rate: rate }));
        addRating({ id: animeId, rating: rate });
    };

    const ChangeRateClick = () => {
        setRate(null);
        setActive(true);
    };

    return !rate ? (
        <div className={cl.container}>
            <button
                onClick={() => setActive(!isActive)}
                className={isActive ? cl.active : cl.main}
                {...props}
            >
                {children}
            </button>
            {isActive && (
                <div className={cl.marks}>
                    {[1, 2, 3, 4, 5].map((item) => (
                        <button
                            key={item}
                            className={cl.marksItem}
                            onClick={() => RateClick(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}
        </div>
    ) : (
        <div className={cl.container}>
            <div className={cl.info}>
                <p>Ваша оценка:</p>
                <button className={cl.userMark} disabled>
                    {rate}
                </button>
            </div>
            <button className={cl.change} onClick={ChangeRateClick}>
				Изменить
            </button>
        </div>
    );
};

export default RateUserButton;
