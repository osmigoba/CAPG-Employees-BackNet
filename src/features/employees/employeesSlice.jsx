import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { GetAllEmployeesRedux, AddEmployeeRedux, DeleteEmployeeRedux, EditEmployeeRedux } from '../../httpService'



const initialState = {
    employees: [],
    getEmployeesStatus:"",
    addEmployeesStatus:"",
    deleteEmployeeStatus:"",
    updateEmployeeStatus:"",
    statusText: "",
}

export const getEmployeesRedux = createAsyncThunk('employees/GetEmployees', async(ThunkAPI) => {
    const TToken = JSON.parse(localStorage.getItem('token'))
    try {
        const data =  await GetAllEmployeesRedux(TToken)   
        return data
    } catch (error) {
        const message = error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

export  const addEmployeeRedux = createAsyncThunk('employees/AddEmployee', async(employeeData, ThunkAPI) => {
    const TToken = JSON.parse(localStorage.getItem('token'))
    try {
        const data = await AddEmployeeRedux(employeeData, TToken)
        return data
    } catch(error) {

        return ThunkAPI.rejectWithValue(error.response.statusText)
    }
})

export  const deleteEmployeeRedux = createAsyncThunk('employees/DeleteEmployee', async(employeeID, ThunkAPI) => {
    const TToken = JSON.parse(localStorage.getItem('token'))
    try {
        const response = await DeleteEmployeeRedux(employeeID, TToken)
        return response.data;
    } catch(error) {
        return ThunkAPI.rejectWithValue(error.response.statusText)
    }
})

export  const updateEmployeeRedux = createAsyncThunk('employees/UpdateEmployee', async(employee, ThunkAPI) => {
    const TToken = JSON.parse(localStorage.getItem('token'))
    try {
        const response = await EditEmployeeRedux(employee, TToken)
        return response.data;
    } catch(error) {

        return ThunkAPI.rejectWithValue(error.response.statusText)
    }
})

export const employeesSlice = createSlice({
    name: 'employeesState',
    initialState,
    reducers: {
        resetAll: (state) => {
            state.employees = []
            state.getEmployeesStatus = ""
            state.addEmployeesStatus = ""
            state.deleteEmployeeStatus = ""
            state.updateEmployeeStatus = ""
        },
        resetAddState: (state) => {
            state.addEmployeesStatus = ""
        },
        resetDeleteState: (state) => {
            state.deleteEmployeeStatus = ""
        },
        resetUpdateState: (state) => {
            state.updateEmployeeStatus = ""
        },
    },
    extraReducers: (builder) => {
        builder
            /// Reducer for GetEmployees Method
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

            /// Reducer for AddEmployee Method
            .addCase(addEmployeeRedux.pending, (state) => {
                state.addEmployeesStatus = "pending" 
            })

            .addCase(addEmployeeRedux.fulfilled, (state, action) => {
                state.addEmployeesStatus = "ok" 
                state.employees.push(action.payload) 
            })

            .addCase(addEmployeeRedux.rejected, (state, action) => {
               state.addEmployeesStatus = "error" 
               state.statusText = action.payload
            })

            /// Reducer for DeleteEmployee Method
            .addCase(deleteEmployeeRedux.pending, (state) => {
                state.deleteEmployeeStatus = "pending" 
            })

            .addCase(deleteEmployeeRedux.fulfilled, (state, action) => {
                state.deleteEmployeeStatus = "ok" 
                const currentEmployees = state.employees.filter(employee => employee.id !== action.payload.id) 
                state.employees = currentEmployees
            })

            .addCase(deleteEmployeeRedux.rejected, (state, action) => {
               state.deleteEmployeeStatus = "error" 
               state.statusText = action.payload
            })            
           
            /// Reducer for UpdateEmployee Method
            .addCase(updateEmployeeRedux.pending, (state) => {
                state.updateEmployeeStatus = "pending" 
            })

            .addCase(updateEmployeeRedux.fulfilled, (state, action) => {
                state.updateEmployeeStatus = "ok" 
                const currentEmployees = state.employees.map(employee => employee.id === action.payload.id ? action.payload : employee) 
                state.employees = currentEmployees
            })

            .addCase(updateEmployeeRedux.rejected, (state, action) => {
               state.updateEmployeeStatus = "error" 
               state.statusText = action.payload
            })             
    }
})
export const { resetAll, resetAddState, resetUpdateState, resetDeleteState } = employeesSlice.actions
export default employeesSlice.reducer
