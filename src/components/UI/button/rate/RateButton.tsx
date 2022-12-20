import { ButtonHTMLAttributes, FC } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import RateNotUserButton from './RateNotUserButton';
import RateUserButton from './RateUserButton';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    animeId: number;
    children?: React.ReactNode;
}

const RateButton: FC<Props> = ({animeId, children, ...props}) => {

    const auth = useAuth();
    const isAuth = !!auth.user;

    if (isAuth) {
        return <RateUserButton animeId={animeId} {...props}>{children}</RateUserButton>
    } else {
        return <RateNotUserButton {...props}>{children}</RateNotUserButton>
    }
};

export default RateButton;