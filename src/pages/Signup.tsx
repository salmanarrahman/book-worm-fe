import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import logo from '../assets/images/technet-logo-white.png';
import { LoginForm } from '@/components/LoginForm';
import { SignupForm } from '@/components/SignUpForm';

export default function Login() {
  return (
    <>
      <div className="container relative  h-screen flex-col items-center justify-center lg:px-0">
     
      
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col  items-center justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign up to your account
              </h1>
             
            </div>
            <SignupForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
             Have an account ?{' '}
              <Link
                to="/signin"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
        

      </div>
    </>
  );
}
