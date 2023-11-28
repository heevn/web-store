import { Device } from '../../store/slices/deviceSlice';

export interface BasketDeviceProps {
  basketDevice: ExtendedBasketDevice
}

export interface ExtendedBasketDevice extends Device{
  idInBasket: number
}