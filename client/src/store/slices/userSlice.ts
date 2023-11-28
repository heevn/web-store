import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface UserType {
  id?: number,
  email: string,
  role: string,
  isAuth: boolean,
  loading?: boolean
}

const initialState : UserType = {
  email: '',
  role: '',
  isAuth: false,
  loading: true
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action : PayloadAction<UserType>) => {
      const {id, email, role} = action.payload;
      state.id = id;
      state.email = email;
      state.role = role;
      state.isAuth = true;
    },
    
    logOut: (state) => {
      localStorage.removeItem('token');
      state.isAuth = false;
    },

    setLoadingUser: (state) => {
      state.loading = false;
    }
  }
})

export const { ...userActions } = userSlice.actions;
export default userSlice.reducer;