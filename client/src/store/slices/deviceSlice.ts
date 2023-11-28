import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface Device {
  id: number,
  name: string,
  price: number,
  brandId: number,
  typeId: number,
  rating: number,
  img: string,
  info: DeviceInfo[]
}

export interface DeviceInfo {
  id: number,
  title: string,
  description: string,
}

export type DeviceProps = Omit<Device, 'id'>

export interface DeviceState {
  devices: Device[]
}

const initialState : DeviceState = {
  devices: []
}

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    addDevice: (state, action : PayloadAction<Device>) => {
      state.devices.push(action.payload);
    },

    setDevices: (state, action : PayloadAction<Device[]>) => {
      state.devices = [...action.payload];
    }
  }
})

export const { ...deviceActions } = deviceSlice.actions;
export default deviceSlice.reducer;