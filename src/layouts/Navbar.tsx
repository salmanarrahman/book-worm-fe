import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { DropdownMenuSeparator } from '../components/ui/dropdown-menu';
import { DropdownMenuLabel } from '../components/ui/dropdown-menu';
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '../components/ui/dropdown-menu';
import { HiOutlineSearch } from 'react-icons/hi';
import logo from '../assets/images/logo.png';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {  signOut } from 'firebase/auth';
import app from '@/lib/Firebase';
import { setUser } from '@/redux/user/userSlice';
import auth from '@/lib/Firebase';

export default function Navbar() {

  const { user } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    console.log('Logout');
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(setUser(null));
    });
  };

  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <img className="h-8" src={logo} alt="log" />
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/book">All Book</Link>
                </Button>
              </li>
             
            
              <li>

                {
                  user.email ?
                    <>
                       <Button variant="link" ><Link to="/add">Add New Books</Link></Button>
                      <Button onClick={handleLogout} variant="link" ><p>Sign Out</p>
                      </Button>
                    </>
                    :
                    <>
                   

                      <Button variant="link" >
                        <Link to="/login">Login</Link>
                      </Button>
                    </>
                }


              </li>

            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
