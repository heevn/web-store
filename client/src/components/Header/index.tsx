import React from 'react'
import './Header.css'
import { AppRoutes } from '../../routes/routes'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks';
import cartIcon from '../../assets/cart.svg'
import { useActions } from '../../hooks/useActions';

export default function Header() {
  const { isAuth } = useAppSelector((state) => state.user);
  const role = useAppSelector((state) => state.user.role);
  const { logOut } = useActions();
  const navigate = useNavigate();

  const handleBasketRoute = () => {
    navigate(AppRoutes.BASKET)
  }

  const handleLogOut = () => {
    logOut();
    console.log(isAuth);
  }

  return (
    <div className='header'>
      <NavLink to={AppRoutes.SHOP} style={{textDecoration: "none", color: "black"}}>PC-SHOP</NavLink>
      <form className='header-form'>
        {
          !isAuth ?
          <button className='header-button'>
            <NavLink to={AppRoutes.LOGIN} style={{textDecoration: "none", color: "black"}}>Sign in</NavLink>
          </button>
          :
          role === 'ADMIN' ?
          <>
            <img className='header-basket' src={cartIcon} alt='basketIcon' onClick={handleBasketRoute}/>
            <button className='header-button'>
              <NavLink to={AppRoutes.ADMIN} style={{textDecoration: "none", color: "black"}}>Admin Panel</NavLink>
            </button>
            <button className='header-button' onClick={handleLogOut}>Sign out</button>
          </>
          :
          <>
            <img className='header-basket' src={cartIcon} alt='basketIcon' onClick={handleBasketRoute}/>
            <button className='header-button' onClick={handleLogOut}>Sign out</button>
          </>
        }
      </form>
    </div>
  )
}
