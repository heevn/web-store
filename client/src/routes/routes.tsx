import App from "../App";
import Admin from "../pages/Admin";
import Auth from "../pages/Auth";
import Basket from "../pages/Basket";
import DevicePage from "../pages/DevicePage";
import Shop from "../pages/Shop";
import AdminRoute from "./AdminRoute";
import BasketRoute from "./BasketRoute";

export enum AppRoutes {
  SHOP = '/',
  DEVICE = '/device/:deviceId',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  ADMIN = '/admin',
  BASKET = '/basket'
}

export const routes = [
  {
    path: AppRoutes.SHOP,
    element: <App />,
    children: [
      {
        path: AppRoutes.DEVICE,
        element: <DevicePage />
      },

      {
        path: AppRoutes.SHOP,
        element: <Shop />
      },

      {
        path: AppRoutes.LOGIN,
        element: <Auth />
      },
    
      {
        path: AppRoutes.REGISTRATION,
        element: <Auth />
      },

      {
        element: <BasketRoute />,
        children: [
          {
            path: AppRoutes.BASKET,
            element: <Basket />
          },
        ]
      },

      {
        element: <AdminRoute />,
        children: [
          {
            path: AppRoutes.ADMIN,
            element: <Admin />
          },
        ]
      }
    ],
  },
]