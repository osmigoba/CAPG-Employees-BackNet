import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { Login } from '../../httpService'
import Swal from 'sweetalert2'
//Get user from LocalStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: user ? true : false,
    isLoading: false,
    message: '',
    name: 'User',
    admin: false
}
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
  })
//lOGIN 
export const login = createAsyncThunk('auth/login', async(user, ThunkAPI) => {
    try {
        const data =  await Login(user)   
          await Toast.fire({
            icon: 'success',
            title: '😎 Login successful',
            timer: 800
          })
        return data
    } catch (error) {
        const message = error.toString()

        await Toast.fire({
            icon: 'error',
            title: '🤨 Unauthorized, Please the check email or password',
            timer: 2500
          })
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
            state.name = 'User'
            state.admin = false
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
                state.name = action.payload.email
                state.admin = action.payload.admin
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
