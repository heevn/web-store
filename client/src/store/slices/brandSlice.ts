import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface DeviceBrand {
  id: number;
  name: string;
}

export interface BrandState {
  brands: DeviceBrand[]
}

const initialState : BrandState  = {
  brands: []
}


export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    addBrand: (state, action : PayloadAction<DeviceBrand>) => {
      state.brands.push(action.payload);
    },

    setBrands: (state, action : PayloadAction<DeviceBrand[]>) => {
      state.brands = [...action.payload];
    }
  }
})

export const { ...brandActions } = brandSlice.actions;
export default brandSlice.reducer;