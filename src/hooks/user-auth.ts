import { useAppSelector } from "./redux";


export function useAuth() {
    const { id, token } = useAppSelector(state => state.auth);

    return {
        isAuth: !!id,
        id,
        token,
    };
};