import { useMemo, useContext } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from '../context/context';

// export const useAuth = () => {
//   const user = useSelector(selectCurrentUser)

//   return useMemo(() => ({ user }), [user]);
// };

export const useAuth = () => {
  return useContext(AuthContext);
};