import axios from 'axios';
//const apiEndpoint = '192.168.1.5:5261'
// const apiEndpoint = 'https://localhost:7261'
const apiEndpoint = 'http://localhost:4005'

export async function GetAllEmployees(Token) {

    try {

        const response = await axios({
            url: apiEndpoint + "/v1/api/employee",
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
            url: apiEndpoint + "/v1/api/skill",
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
            url: apiEndpoint + "/v1/api/level",
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

export async function GetSkillsByEmployeeId(employee) {

    try {

        const response = await axios({
            url: apiEndpoint + "/v1/api/employee-skills/" + employee.EmployeeId,
            method: 'GET'
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function DeleteEmployee(employeeId) {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/Employee/" + employeeId,
            method: 'DELETE'
        });
        return response;
    } catch (e) {
        console.log(e);
        return (e.response);
    }
}

export async function AddEmployee(employee) {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/Employee/",
            method: 'POST',
            data: {
                firstName: employee.firstName,
                lastName: employee.lastName,
                doj: employee.doj,
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

export async function EditEmployee(employee) {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/Employee",
            method: 'PUT',
            data: {
                id: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                doj: employee.doj,
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

export async function AddSkillToEmployee(skillAdd) {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/Employee/skill",
            method: 'POST',
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

export async function AddSkill(skill) {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/Skill",
            method: 'POST',
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


export async function DeleteSkill(skillId) {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/Skill/" + skillId,
            method: 'Delete'
        });
        return response;
    } catch (e) {
        console.log(e);
        return (e.response);
    }
}

export async function DeleteEmployeeSkill(skillId, employeeId) {

    try {

        const response = await axios({
            url: apiEndpoint + `/api/Employee/${skillId}/${employeeId}`,
            method: 'Delete',
            
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
        url: apiEndpoint + '/v1/auth/login',
        method: 'Post',
        data: user
    });
    if(response.data){
        // localStorage.setItem('User', JSON.stringify(response.data.User))
        localStorage.setItem('token', JSON.stringify(response.data.Token))
        return response.data;
    }
}