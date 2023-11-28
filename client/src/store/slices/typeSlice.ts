import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface DeviceType {
  id: number;
  name: string;
}

export interface TypeState {
  types: DeviceType[]
}

const initialState : TypeState  = {
  types: []
}

export const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    setTypes: (state, action : PayloadAction<DeviceType[]>) => {
      state.types = [...action.payload];
    },

    addType: (state, action : PayloadAction<DeviceType>) => {
      state.types.push(action.payload);
    },
  }
})

export const { ...typeActions } = typeSlice.actions;
export default typeSlice.reducer;