import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';
import { useAppDispatch } from './redux/hooks';
import app from './lib/Firebase';
import { setLoading, setUser } from './redux/user/userSlice';
import { useEffect } from 'react';



function App() {

  const dispatch = useAppDispatch()

  useEffect(()=>{

  onAuthStateChanged(getAuth(app),(user)=>{

    dispatch(setLoading(true))

    if(user){
      dispatch(setUser(user.email))
      dispatch(setLoading(false))
    }else{
      dispatch(setLoading(false))
    }

  })
  },[dispatch])

  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
