import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { GetAllEmployeesRedux } from '../../httpService'



const initialState = {
    employees: [],
    getEmployeesStatus:"",
}

export const getEmployeesRedux = createAsyncThunk('empployees/Getmployees', async(token, ThunkAPI) => {
    try {
        const data =  await GetAllEmployeesRedux(token)   
        return data
    } catch (error) {
        const message = error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})



export const employeesSlice = createSlice({
    name: 'employeesState',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEmployeesRedux.pending, (state) => {
                state.getEmployeesStatus = "pending"
            })

            .addCase(getEmployeesRedux.fulfilled, (state, action) => {
                state.getEmployeesStatus = "ok"
                state.employees = action.payload
            })

            .addCase(getEmployeesRedux.rejected, (state, action) => {
                state.getEmployeesStatus = "error"
            })
           
    }
})

export default employeesSlice.reducer
