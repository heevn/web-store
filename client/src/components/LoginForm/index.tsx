import React, { useState } from 'react'
import './LoginForm.css'
import { UserType} from '../../store/slices/userSlice';
import { AppRoutes } from '../../routes/routes';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import userService from '../../services/user.service';

export default function LoginForm() {
  const { logIn } = useActions();
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === AppRoutes.LOGIN;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmail = (event : React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail(event.target.value);
  }

  const handlePassword = (event : React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
  }

  const signIn = async (email : string, password: string) => {
    let user : UserType;
    try {
      if (isLogin) {
        user = await userService.login(email, password) as UserType;
      } else {
        user = await userService.registration(email, password) as UserType;
      }
      logIn(user);
      navigate(AppRoutes.SHOP);
    } catch (error : any) {
      alert(error.response.data.message);
    }
  }

  const signInHandler = (event : React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signIn(email, password);
  }

  return (
    <div className="login">
      <div className='login-box'>
        <div>Sign in or sign up</div>
        <form className='login-form'>
          <input type='email' className='login-input' placeholder='email' onChange={handleEmail}></input>
          <input type='password' className='login-input' placeholder='password' onChange={handlePassword}></input>
          <button className='login-button' onClick={signInHandler}>{isLogin ? 'Login' : 'Register'}</button>
        </form>
        {
          isLogin ?
          <div className='registration-text'>Doesn&apos;t have an account? <NavLink to={AppRoutes.REGISTRATION}>Sign up now!</NavLink></div>
          :
          <div className='registration-text'>Already have an account? <NavLink to={AppRoutes.LOGIN}>Sign in!</NavLink></div>
        }
      </div>
    </div>
  )
}