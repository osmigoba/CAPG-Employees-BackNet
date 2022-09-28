import axios from 'axios';
// const apiEndpoint = '192.168.1.4:4321'
// const apiEndpoint = 'https://localhost:7261'
const apiEndpoint = 'http://localhost:4321'

export async function GetAllEmployees(Token) {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/employee",
            method: 'GET',
            headers:{
                authorization: `Bearer ${Token}` 
            }
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function GetAllSkills(Token) {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/skill",
            method: 'GET',
            headers:{
                authorization: `Bearer ${Token}` 
            }            
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function GetAllExpertiseLevel(Token) {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/expertise",
            method: 'GET',
            headers:{
                authorization: `Bearer ${Token}` 
            }            
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function GetSkillsByEmployeeId(employee, Token) {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/employee/skill/" + employee.id,
            method: 'GET',
            headers:{
                authorization: `Bearer ${Token}` 
            }
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function DeleteEmployee(employeeId, Token) {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/employee/" + employeeId,
            method: 'DELETE',
            headers:{
                authorization: `Bearer ${Token}` 
            }
        });
        return response;
    } catch (e) {
        console.log(e);
        return (e.response);
    }
}

export async function AddEmployee(employee, Token) {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/employee",
            method: 'POST',
            headers:{
                authorization: `Bearer ${Token}` 
            },
            data: {
                firstName: employee.firstName,
                lastName: employee.lastName,
                doj: employee.doj + "T00:00:00-05:00",
                email: employee.email,
                designation: employee.designation
            }

        });
        return response;
    } catch (e) {
        console.log(e);
        return (e.response);
    }
}

export async function EditEmployee(employee,Token) {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/employee/" + employee.id,
            method: 'PUT',
            headers:{
                authorization: `Bearer ${Token}` 
            },
            data: {
                firstName: employee.firstName,
                lastName: employee.lastName,
                doj: employee.doj + "T12:00:00-05:00",
                email: employee.email,
                designation: employee.designation
            }
        });
        return response;
    } catch (e) {
        console.log(e);
        return (e.response);
    }
}

export async function AddSkillToEmployee(skillAdd, Token) {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/employee/skill",
            method: 'POST',
            headers:{
                authorization: `Bearer ${Token}` 
            },
            data: {
                employeeID: skillAdd.employeeID,
                skillID: skillAdd.skillID,
                levelRatingId: skillAdd.levelRatingId,
                experience: skillAdd.experience
            }
        });
        return response;
    } catch (e) {
        console.log(e);
        return (e.response);
    }
}

export async function AddSkill(skill, Token) {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/skill",
            method: 'POST',
            headers:{
                authorization: `Bearer ${Token}` 
            },
            data: {
                skill: skill
            }
        });
        return response;
    } catch (e) {
        console.log(e);
        return (e.response);
    }
}


export async function DeleteSkill(skillId, Token) {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/skill/" + skillId,
            method: 'Delete',
            headers:{
                authorization: `Bearer ${Token}` 
            },
        });
        return response;
    } catch (e) {
        console.log(e);
        return (e.response);
    }
}

export async function DeleteEmployeeSkill(skillId, employeeId, Token) {

    try {

        const response = await axios({
            url: apiEndpoint + `/api/employee_skill/${skillId}/${employeeId}`,
            method: 'Delete',
            headers:{
                authorization: `Bearer ${Token}` 
            }
            
        });
        return response;
    } catch (e) {
        console.log(e);
        return (e.response);
    }
}

export async function Login(user) {
    const response = await axios({
        // url: apiEndpoint + `/api/Session/Login`,
        url: apiEndpoint + '/auth/login',
        method: 'Post',
        data: user
    });
    if(response.data){
        // localStorage.setItem('User', JSON.stringify(response.data.User))
        localStorage.setItem('token', JSON.stringify(response.data.token))
        return response.data;
    }
}

export async function GetEmployeesBySkillId(skillId, Token) {
    try {
        const response = await axios({
            url: apiEndpoint + `/api/employeesbyskill/${skillId}`,
            method: 'GET',
            headers:{
                authorization: `Bearer ${Token}` 
            }
        });
        return response.data;
    }
    catch (e) {
        console.log(e);
        return (e.response);
    }
}

export async function GetEmployeesByLevelId(levelId, Token) {
    try {
        const response = await axios({
            url: apiEndpoint + `/api/employeesbylevel/${levelId}`,
            method: 'GET',
            headers:{
                authorization: `Bearer ${Token}` 
            }     
        });
        return response.data;
    }
    catch (e) {
        console.log(e);
        return (e.response);
    }

}