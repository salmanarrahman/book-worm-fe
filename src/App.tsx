import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Toaster, toast } from 'react-hot-toast';
import MainLayout from './layouts/MainLayout';
import { useAppDispatch } from './redux/hooks';
import { setLoading, setUser } from './redux/user/userSlice';
import { useEffect } from 'react';
import auth from './lib/Firebase';



function App() {

  const dispatch = useAppDispatch()

  useEffect(()=>{

  onAuthStateChanged(auth,(user)=>{

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
