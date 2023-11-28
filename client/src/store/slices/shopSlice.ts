import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface Page {
  page: number;
  totalCount: number;
  selectedBrand?: number;
  selectedType?: number;
  isLoading: boolean;
}

const initialState : Page = {
  page: 1,
  totalCount: 0,
  selectedBrand: undefined,
  selectedType: undefined,
  isLoading: false
}

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setTotalCount: (state, action : PayloadAction<number>) => {
      state.totalCount = action.payload;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      console.log(state.page)
    },

    selectBrand: (state, action: PayloadAction<number | undefined>) => {
      state.selectedBrand = action.payload;
    },

    selectType: (state, action: PayloadAction<number | undefined>) => {
      state.selectedType = action.payload;
    },

    setLoading: (state) => {
      state.isLoading = true
    }
  }
})

export const { ...shopActions } = shopSlice.actions;
export default shopSlice.reducer;