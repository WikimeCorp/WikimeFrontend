import { useMemo, useContext } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from '../context/context';
import { selectCurrentUser } from '../store/reducers/AuthSlice';

// export const useAuth = () => {
//   const user = useSelector(selectCurrentUser)

//   return useMemo(() => ({ user }), [user]);
// };

export const useAuth = () => {
  return useContext(AuthContext);
};