import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
const baseURL = 'http://localhost:4321'
const initialState = {
    levels: [],
    getLevelsStatus:"",

}

export const getLevelsRedux = createAsyncThunk('levels/GetLevels', async(ThunkAPI) => {
    const Token = JSON.parse(localStorage.getItem('token'))
    try {
        const response =  await axios({
            url: baseURL + "/api/expertise",
            method: 'GET',
            headers:{
                authorization: `Bearer ${Token}` 
            }            
        })   
        return response.data
    } catch (error) {
        const message = error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

export const levelsSlice = createSlice({
    name: 'levelsState',
    initialState,
    reducers: {
        resetAllLevels: (state) => {
            state.levels = []
            state.getLevelsStatus = ""
        },
    }, 
    extraReducers: (builder) => {
        builder

        .addCase(getLevelsRedux.pending, (state) => {
            state.getLevelsStatus = "pending"
        })
        .addCase(getLevelsRedux.fulfilled, (state, action) => {
            state.getLevelsStatus = "ok"
            state.levels = action.payload
        })
        .addCase(getLevelsRedux.rejected, (state, action) => {
            state.getLevelsStatus = "error"
        })         
    }

})

export const { resetAllLevels } = levelsSlice.actions
export default levelsSlice.reducer