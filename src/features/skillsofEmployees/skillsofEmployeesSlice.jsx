import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const baseURL = 'http://localhost:4321'
const initialState = {
    skillsOfEmployees: [],
    getskillOfEmployeesStatus:"",
    deleteSkillOfEmployeeStatus:"",
    addSkillOfEmployeeStatus: "",
}

export const getskillOfEmployees = createAsyncThunk('skillsOfEmployees/GetSkillsOfEmployees', async(ThunkAPI) => {
    const Token = JSON.parse(localStorage.getItem('token'))
    try {
        const response =  await axios({
            url: baseURL + "/api/employeewithskills",
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

export const deleteSkillOfEmployee = createAsyncThunk('skillsOfEmployees/DeleteSkillOfEmployee', async(SKILL, ThunkAPI) => {
    const Token = JSON.parse(localStorage.getItem('token'))
    try {
        const response = await axios({
            url: baseURL + `/api/employee_skill/${SKILL.skillID}/${SKILL.employeeId}`,
            method: 'Delete',
            headers:{
                authorization: `Bearer ${Token}` 
            }
            
        });
        return response.data;
    } catch (error) {
        const message = error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

export const assignSkillOfEmployee = createAsyncThunk('skillsOfEmployees/AddSkillOfEmployee', async(skillAdd, ThunkAPI) => {
    const Token = JSON.parse(localStorage.getItem('token'))
    try {
        await axios({
            url: baseURL + "/api/employee/skill",
            method: 'POST',
            headers:{
                authorization: `Bearer ${Token}` 
            },
            data: {
                employeeID: skillAdd.employeeId,
                skillID: skillAdd.skillID,
                levelRatingId: skillAdd.levelId,
                experience: skillAdd.experience
            }
        });
        return skillAdd;
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response)
    }
})

export const skillsofEmployeesSlice = createSlice({
    name: 'skillsOfEmployeesState',
    initialState,
    reducers: {
        resetAllskillsOfEmployees: (state) => {
            state.skillsOfEmployees = []
            state.getskillOfEmployeesStatus = ""
            state.addSkillOfEmployeeStatus = ""
        },
        resetDeleteSkillOfEmployeeState: (state) => {
            state.deleteSkillOfEmployeeStatus = ""
        }, 
        resetAddSkillOfEmployeeStatus: (state) => {
            state.addSkillOfEmployeeStatus = ""
        }, 
        deleteSkillsOfEmployeesByEmployeeId: ( state, action) => {
            const currentskillEmployees = [...state.skillsOfEmployees]  
            const filteredskills = currentskillEmployees.filter((skillsEmp) => skillsEmp.employeeId !== action.payload)
            state.skillsOfEmployees = filteredskills
        },
        deleteSkillsOfEmployeesBySkillId: ( state, action) => {
            const currentskillEmployees = [...state.skillsOfEmployees]  
            const filteredskills = currentskillEmployees.filter((skillsEmp) => skillsEmp.skillID !== action.payload)
            state.skillsOfEmployees = filteredskills
        }               
    }, 
    extraReducers: (builder) => {
        builder
        // GET
        .addCase(getskillOfEmployees.pending, (state) => {
            state.getskillOfEmployeesStatus = "pending"
        })
        .addCase(getskillOfEmployees.fulfilled, (state, action) => {
            state.getskillOfEmployeesStatus = "ok"
            state.skillsOfEmployees = action.payload
        })
        .addCase(getskillOfEmployees.rejected, (state, action) => {
            state.getskillOfEmployeesStatus = "error"
        }) 

        // Delete
        .addCase(deleteSkillOfEmployee.pending, (state) => {
            state.deleteSkillOfEmployeeStatus = "pending"
        })
        .addCase(deleteSkillOfEmployee.fulfilled, (state, action) => {
            state.deleteSkillOfEmployeeStatus = "ok"
            const currentskillEmployees = [...state.skillsOfEmployees]
            let indice;
            currentskillEmployees.forEach((skillemployee, index) => {
                if (skillemployee.employeeId === action.payload.employee_Id && skillemployee.skillID === action.payload.skill_ID) {
                  indice = index;
                }
            })
            currentskillEmployees.splice(indice, 1);  
            state.skillsOfEmployees = currentskillEmployees
            console.log(indice)

        })
        .addCase(deleteSkillOfEmployee.rejected, (state, action) => {
            state.deleteSkillOfEmployeeStatus = "error"
        })

        //Add SkillEmployees
        .addCase(assignSkillOfEmployee.pending, (state) => {
            state.addSkillOfEmployeeStatus = "pendieng"
        })
        .addCase(assignSkillOfEmployee.fulfilled, (state, action) => {
            state.addSkillOfEmployeeStatus = "ok"
            state.skillsOfEmployees.push(action.payload)
        }) 
        
        .addCase(assignSkillOfEmployee.rejected, (state, action) => {
            state.addSkillOfEmployeeStatus = "error"
        })
    }

})

export const { resetAllskillsOfEmployees, resetDeleteSkillOfEmployeeState, deleteSkillsOfEmployeesByEmployeeId, deleteSkillsOfEmployeesBySkillId } = skillsofEmployeesSlice.actions
export default skillsofEmployeesSlice.reducer