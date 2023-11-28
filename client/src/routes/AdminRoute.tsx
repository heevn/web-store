import React, { useEffect } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AppRoutes } from './routes';
import { useAppSelector } from '../store/hooks';

export default function AdminRoute() {
  const {isAuth, loading, role} = useAppSelector((state) => state.user);
  const location =  useLocation();

  return (
    loading ? <div>Loading</div> :
    isAuth && role === 'ADMIN'?
    <Outlet /> 
    :
    <Navigate to={AppRoutes.SHOP} state={{from: location}} replace/>
  )
}