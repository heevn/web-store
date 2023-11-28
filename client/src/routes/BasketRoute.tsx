import React, { useEffect } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AppRoutes } from './routes';
import { useAppSelector } from '../store/hooks';

export default function BasketRoute() {
  const {isAuth, loading} = useAppSelector((state) => state.user);
  const location =  useLocation();

  return (
    loading ? <div>Loading</div> :
    isAuth?
    <Outlet /> 
    :
    <Navigate to={AppRoutes.LOGIN} state={{from: location}} replace/>
  )
}
