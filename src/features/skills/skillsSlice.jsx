
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
const baseURL = 'http://localhost:4321'
const initialState = {
    skills: [],
    getSkillsStatus:"",
    addSkillStatus:"",
    deleteSkillStatus:"",
    updateSkillStatus: "",

}

export const getSkillsRedux = createAsyncThunk('skills/GetSkills', async(ThunkAPI) => {
    const Token = JSON.parse(localStorage.getItem('token'))
    try {
        const response =  await axios({
            url: baseURL + "/api/skill",
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

export const deleteSkillRedux = createAsyncThunk('skills/DeleteSkill', async(skillId,ThunkAPI) => {
    const Token = JSON.parse(localStorage.getItem('token'))
    try {
        const response = await axios({
            url: baseURL + "/api/skill/" + skillId,
            method: 'DELETE',
            headers:{
                authorization: `Bearer ${Token}` 
            },
        });  
        return response.data
    } catch (error) {
        const message = error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

export const addSkillRedux = createAsyncThunk('skills/AddSkill', async(skill,ThunkAPI) => {
    const Token = JSON.parse(localStorage.getItem('token'))
    try {
        const response = await axios({
            url: baseURL + "/api/skill",
            method: 'POST',
            headers:{
                authorization: `Bearer ${Token}` 
            },
            data: skill
        }); 
        return response.data
    } catch (error) {
        const message = error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

export const skillsSlice = createSlice({
    name: 'skillsState',
    initialState,
    reducers: {
        resetAllSkills: (state) => {
            state.skills = []
            state.getSkillsStatus = ""
            state.addSkillStatus = ""
            state.deleteSkillStatus = ""
        },
        resetAddSkillState: (state) => {
            state.addSkillStatus = ""
        },
        resetDeleteSkillState: (state) => {
            state.deleteSkillStatus = ""
        },
        resetUpdateSkillState: (state) => {
            state.updateSkillStatus = ""
        },
    }, 
    extraReducers: (builder) => {
        builder
        
        .addCase(getSkillsRedux.pending, (state) => {
            state.getSkillsStatus = "pending"
        })
        .addCase(getSkillsRedux.fulfilled, (state, action) => {
            state.getSkillsStatus = "ok"
            state.skills = action.payload
        })
        .addCase(getSkillsRedux.rejected, (state, action) => {
            state.getSkillsStatus = "error"
        })  
        
        /// Reducer for Delete Skill Method
        .addCase(deleteSkillRedux.pending, (state) => {
            state.deleteSkillStatus = "pending" 
        })

        .addCase(deleteSkillRedux.fulfilled, (state, action) => {
            state.deleteSkillStatus = "ok" 
            const currentSkills = state.skills.filter(skill => skill.id !== action.payload.id) 
            state.skills = currentSkills
        })

        .addCase(deleteSkillRedux.rejected, (state, action) => {
            state.deleteSkillStatus = "error" 
        })      
        
        /// Reducer for Add Skill Method
        .addCase(addSkillRedux.pending, (state) => {
            state.addSkillStatus = "pending" 
        })

        .addCase(addSkillRedux.fulfilled, (state, action) => {
            state.addSkillStatus = "ok" 
            state.skills.push(action.payload)
        })

        .addCase(addSkillRedux.rejected, (state, action) => {
            state.addSkillStatus = "error" 
        })  
    },   
})
export const { resetAllSkills, resetAddSkillState, resetDeleteSkillState, resetUpdateSkillState } = skillsSlice.actions
export default skillsSlice.reducer