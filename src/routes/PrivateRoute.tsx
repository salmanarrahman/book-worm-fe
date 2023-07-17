import { useAppSelector } from '@/redux/hooks';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }) {
  const { user,isLoading } = useAppSelector(state => state.user)
  console.log(user);


  const { pathname } = useLocation();

  if (isLoading) {
    return <p>Loading...</p>;
  }else  if (!user.email && !isLoading) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
}