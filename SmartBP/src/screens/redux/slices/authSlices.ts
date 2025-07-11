import { createSlice } from '@reduxjs/toolkit';
import { create } from 'react-test-renderer';
interface authState {
  _id: string;
  accessToken: string;
  name: string;
}
const initialSate: authState = {
  _id: '',
  accessToken: '',
  name: '',
};
const authSlice = createSlice({
  name: 'user',
  initialState: {
    authData: initialSate,
  },
  reducers: {
    addAuth: (state, action) => {
      state.authData = action.payload;
    },
    removeAuth: (state, action) => {
      state.authData = initialSate;
    },
  },
});
export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth } = authSlice.actions;
export const authSelector = (state: any) => state.authReducer.authData;
