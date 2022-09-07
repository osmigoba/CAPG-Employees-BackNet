import axios from 'axios';
//const apiEndpoint = '192.168.1.5:5261'
const apiEndpoint = 'https://localhost:7261'

export async function GetAllEmployees() {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/Employee",
            method: 'GET'
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function GetAllSkills() {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/Skill",
            method: 'GET'
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function GetAllExpertiseLevel() {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/ExpertiseLevel",
            method: 'GET'
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function GetSkillsByEmployeeId(employee) {

    try {

        const response = await axios({
            url: apiEndpoint + "/api/Employee/skill/" + employee.id,
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
        url: apiEndpoint + `/api/Session/Login`,
        method: 'Post',
        data: user
    });
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    
    return response.data;
}