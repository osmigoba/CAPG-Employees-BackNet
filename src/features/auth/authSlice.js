import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { Login } from '../../httpService'

//Get user from LocalStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: user ? true : false,
    isLoading: false,
    message: ''
}

//lOGIN 
export const login = createAsyncThunk('auth/login', async(user, ThunkAPI) => {
    try {
        return await Login(user)
         
    } catch (error) {
        const message = error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token') // deletes token from storage
            state.isLoading = false
            state.error = true
            state.message = ''
            state.isSuccess = false
            state.user = null
          },        
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })

            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = false
                state.isSuccess = true
                state.user = action.payload
            })

            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
                state.message = action.payload
                state.user = null
                state.isSuccess = false
            })
           
    }
})

export const { reset, logout } = authSlice.actions
export default authSlice.reducer
