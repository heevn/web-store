import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface BasketDeviceType {
  id: number
  basketId: number,
  deviceId: number
}

export interface BasketState {
  basketDevices: BasketDeviceType[]
}

const initialState : BasketState = {
  basketDevices: []
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasketDevice: (state, action : PayloadAction<BasketDeviceType[]>) => {
      state.basketDevices = [...action.payload];
    }
  }
})

export const {...basketActions} = basketSlice.actions;
export default basketSlice.reducer;