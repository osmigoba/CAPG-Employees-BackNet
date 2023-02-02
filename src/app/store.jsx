import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import employeesReducer from '../features/employees/employeesSlice'
import skillsReducer from '../features/skills/skillsSlice'
import levelsReducer from '../features/expertiseLevel/levelsSlice'
import skillsOfEmployeesReducer from '../features/skillsofEmployees/skillsofEmployeesSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        employeesState: employeesReducer,
        skillsState: skillsReducer,
        levelsState: levelsReducer,
        skillsOfEmployeesState: skillsOfEmployeesReducer
    },
});
