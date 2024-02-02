import { createSlice } from '@reduxjs/toolkit'

const initialState = {
userData: null,
isLoading: false,
isError: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true
    },
    signInSuccessful: (state, action) => {
        state.isLoading = false,
        state.isError = false,
        state.userData = action.payload
    },
    signInFailure: (state, action) => {
        state.isLoading = false,
        state.isError = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { signInStart, signInSuccessful, signInFailure } = userSlice.actions

export default userSlice.reducer