import React, {useEffect, useState} from 'react';
import './Home.scss'
import  { GetAllEmployees, GetAllSkills, GetAllExpertiseLevel, GetSkillsByEmployeeId, GetEmployeesBySkillId, GetEmployeesByLevelId}  from '../../httpService.js';
import { Container, Row, Col } from 'reactstrap';
import { Button, FormGroup, Label } from 'reactstrap';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import ModalHomeSkills from '../Modals/ModalHomeSkills.jsx';
import ModalSearchEmployees from '../Modals/ModalSearchEmployeesBySkill.jsx';
import ModalSearchEmployeesExpert from '../Modals/ModalSearchEmployeesByExpertise.jsx';
import ModalSearchEmployeesBySkillAndLevelId from '../Modals/ModalSearchEmployeesBySkillAndLevelId.jsx';
import { useSelector, useDispatch } from 'react-redux'
import * as XLSX from "xlsx";
import UnAuthorized from '../unAuthorized/unAuthorizedComponent.jsx'
import { motion } from "framer-motion"
import Swal from 'sweetalert2'



const Home = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
  })
  let dataToSearch = {
    skillId: 1,
    levelId: 1
  }
  const [showModal, setShowModal] = useState(false)
  const [showModalSearchEmployees, setshowModalSearchEmployees] = useState(false)
  const [showModalSearchEmployeesExpert, setShowModalSearchEmployeesExpert] = useState(false)
  const [showModalModalSearchEmployeesBySkillAndLevelId, setShowModalModalSearchEmployeesBySkillAndLevelId] = useState(false)
  const [searchSkillAndLevel, setSearchSkillAndLevel] = useState([])
  const [skillToShow, setSkillToShow] = useState('')
  const [skillsbyemployee, setskillsbyemployee] = useState([])
  const [employeeWithskill, setEmployee] = useState([])
  const [employeesSearch, setemployeesSearch] = useState([])
  const [employeesSearchSkillLevel, setemployeesSearchSkillLevel] = useState(dataToSearch)
  // For every search
  const [search, setSearch] = useState('');



  //////////////////////////////////////////////////////////////
  ///////////////////  REDUX TOOLKIT //////////////////////////
  const { user, isSuccess} = useSelector((state) => state.auth)
  const employeesState  = useSelector((state) => state.employeesState)
  const  {employees, getEmployeesStatus}  = employeesState;
  const skillssState  = useSelector((state) => state.skillsState)
  const  {skills, getSkillsStatus}  = skillssState;
  const levelsState  = useSelector((state) => state.levelsState)
  const  {levels, getLevelsStatus}  = levelsState; 
  const skillEmployeesStatus = useSelector((state) => state.skillsOfEmployeesState)
  const {skillsOfEmployees, getskillOfEmployeesStatus} = skillEmployeesStatus 
  const dispatch = useDispatch()
  const token = JSON.parse(localStorage.getItem('token'))

  useEffect ( () => {
    if (getSkillsStatus === 'ok' && getLevelsStatus === 'ok') {

      dataToSearch.levelId = levels[0].id;
      dataToSearch.skillId = skills[0].id;
      setemployeesSearchSkillLevel(dataToSearch)
      console.log('datatosearch useEffec: ', dataToSearch)
    }

  }, [getSkillsStatus, getLevelsStatus])


  const sendDataEmployee = async (employeedata) => {
    const filterSkillsOfEmployees = skillsOfEmployees.filter((skillemployee) => skillemployee.employeeId === employeedata.id)
    if (filterSkillsOfEmployees.length === 0){
      setskillsbyemployee([])
    } else {
      setskillsbyemployee(filterSkillsOfEmployees)
    }
    setskillsbyemployee(filterSkillsOfEmployees)
    setEmployee(employeedata)
    setShowModal(true)
  }

  const onHandleSelectSkill  = async (skill) => {
    setemployeesSearchSkillLevel({...employeesSearchSkillLevel, skillId: skill.id})
    const listEmployeesWithSkillId = skillsOfEmployees.filter(skillOf => skillOf.skillID === skill.id)
    const varEmp = [];
    listEmployeesWithSkillId.forEach(item => {
      employees.forEach(emplo => {
        if(emplo.id === item.employeeId){
          varEmp.push(emplo)
        }
      })
    })
    console.log('list of Employees: ', varEmp);
    if (varEmp.length !== 0){
      setemployeesSearch(varEmp)
      setshowModalSearchEmployees(true)
      setSkillToShow(skill.skill)
    } else {
      await Toast.fire({
        title: `🤨 This skill does not have employees assigned`,
        icon: 'error',
        timer: 1500,
        position: "top"
      })
    } 
  }
  const handleSelectLevel = async (event) => {
    console.log(employeesSearchSkillLevel)
    const value = event.target.value
    setemployeesSearchSkillLevel({...employeesSearchSkillLevel, levelId: parseInt(value)})
    const listEmployeesWithLevelId = skillsOfEmployees.filter(skillOf => skillOf.levelId === parseInt(value))
    const varEmp = [];
    listEmployeesWithLevelId.forEach(item => {
      employees.forEach(emplo => {
        if(emplo.id === item.employeeId){
          const newObj = {...emplo};
          newObj.levelName = item.level;
          newObj.skill = item.skill;
          varEmp.push(newObj);
        }
      })
    })

    if (varEmp.length !== 0){
      setemployeesSearch(varEmp)
      setShowModalSearchEmployeesExpert(true)
    } else {
      await Toast.fire({
        title: `🤨 This Expertise Level has not been assigned`,
        icon: 'error',
        timer: 1500,
        position: "top"
      })
    } 

  }


  const handleSearchButton = async ()=> {
    const listOfemployeeSkills = skillsOfEmployees.filter(item => (item.skillID === employeesSearchSkillLevel.skillId));
    const finalList = listOfemployeeSkills.filter(item => item.levelId === employeesSearchSkillLevel.levelId)
    console.log('::::',finalList)
    console.log(employeesSearchSkillLevel)
    
    const varEmp = [];
    finalList.forEach(item => {
      console.log(item)
      employees.forEach(emplo => {
        if(emplo.id === item.employeeId){
          varEmp.push(emplo);
        }
      })
    })
    console.log('varEmployees: ', varEmp)
    console.log(filteredEmployees)
    if (varEmp.length !== 0){
      setemployeesSearch(varEmp)
      setSearchSkillAndLevel(finalList)
      setShowModalModalSearchEmployeesBySkillAndLevelId(true)
    } else {
       Toast.fire({
        title: `🤨 There are not Employees with skill ${(skills.filter(item => item.id === employeesSearchSkillLevel.skillId))[0].skill} and expertise ${(levels.filter(item => item.id === employeesSearchSkillLevel.levelId))[0].name}`,
        icon: 'error',
        timer: 2000,
        position: "top"
      })
    } 
  }


  const handleChange = (event) =>{ 
    setSearch(event.target.value); 
  }
  const filteredEmployees = 
    employees.filter(employee => 
      employee.firstName.toLowerCase().includes(search.toLowerCase())
    )
  const handleExport = async () => {
    // const listFiltered = skillsOfEmployees.map(item => ({
    //   EmployeeId: item.employeeId,
    //   skill: item.skill,
    //   expertise: item.level,
    //   experience: item.experience
    // }))  
    // console.log(listFiltered)
    // const listEmployeesModified = employees.map(emp => ({
    //   ...emp,
    //   skills: listFiltered.filter(i => i.EmployeeId === emp.id).map(item => ({
    //     skill: item.skill,
    //     expertise: item.expertise,
    //     experience: item.experience        
    //   }))
    // }));
    const employeesmodified = employees.map(item => ({
      id: item.id,
      fullName: `${item.firstName} ${item.lastName}`,
      email: item.email,
      doj: item.doj,
      designation: item.designation,
    }))
    const finalList = skillsOfEmployees.map(item => ({
      employeeId: item.employeeId,
      name: employees.filter(i => i.id === item.employeeId).map(obj => 
          `${obj.firstName} ${obj.lastName}`)[0],
      skill: item.skill,
      expertiseLevel: item.level,
      experience: item.experience
    }))

    console.log('primera lista :', employeesmodified)
    console.log('lista final de skills con el nombre :', finalList)

    let workBook = XLSX.utils.book_new();
    let workSheet1 = XLSX.utils.json_to_sheet(employeesmodified);
    let workSheet2 = XLSX.utils.json_to_sheet(finalList);
    XLSX.utils.book_append_sheet(workBook, workSheet1, 'Employees');
    XLSX.utils.book_append_sheet(workBook, workSheet2, 'Skills');
    XLSX.writeFile(workBook, "Report.xlsx");
    await Toast.fire({
      title: `The Report hass been created Successfully`,
      icon: 'success',
      timer: 2000,
      position: "top"
    }) 
  }
  return (
    <motion.div
      initial={{opacity: 0, x: 100 }}
      animate={{opacity: 1, x: 0 }}
      exit={{opacity: 0, x: -100 }}
      transition={{duration: 0.7}}
    >{ isSuccess ? (
        <Container>
        <Row>
          <Col>
            <FormGroup  className='formgroup1' value={1} id='1' key={1}>
              <Label >Search by Name</Label>
              <Form.Control  id="Email" placeholder="Search Employees" onChange={(event) => handleChange(event)}/>
            </FormGroup>
            <FormGroup className='formGroup2' id='2' value={2} key={2}>
              <Label >Search by Expert Level</Label>
              <Form.Select type="select" name="select" onChange={(e) => handleSelectLevel(e, token)}>
                { levels.map( (level) =>(
                  <option value={level.id}>{level.id}. {level.name}</option> 
                ))}
              </Form.Select>
            </FormGroup> 
          </Col>
          <Col>
            <FormGroup className='formgroup1'>
              <Label>Search by Skills</Label>
              <Form.Select className='inputSkills' type="select" name="selectMulti" id="SelectMul" multiple size={5}>
                { skills.map( (skill) =>(
                      <option value={skill.id} onClick={() => onHandleSelectSkill(skill)}>{skill.id}. {skill.skill}</option> 
                    ))}                
              </Form.Select>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 'auto', offset: 0 }}>
            <Button color="warning" size="sm" onClick={() => handleSearchButton() }> Search Employees </Button>  
          </Col>
                  
        </Row>
        <Row>
          <FormGroup className='formgroup1'>
            <Label >Total Found: {employees.length} Results {' '}
              <Button color="secondary" size="sm" onClick={() => handleExport()}>
                Export to Excel 
              </Button>
            </Label>
              <Table className='table table-striped' bordered='true' size="sm">
                <thead className='text-dark'>
                  <tr>
                    <th> # </th>
                    <th>Name</th>
                    <th>Date of Joining</th>
                    <th>Designation</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>

                  { filteredEmployees.map( (employee) =>(
                    <tr key={employee.id}>
                      <td> {employee.id}</td>
                      <td> {employee.firstName + " "+employee.lastName} </td>
                      <td> {employee.doj.slice(0, 10)} </td>
                      <td> {employee.designation} </td>
                      <td> {employee.email} </td>
                      <td>
                      <Button color="info" size="sm" onClick={ () => sendDataEmployee(employee) }>View Skills</Button> 
                      </td>
                    </tr>
                    )) }
                </tbody>
              </Table>
          </FormGroup>
        </Row>
        <ModalHomeSkills 
          showModal = {showModal} 
          setShowModal = {setShowModal}
          skillstoShow = {skillsbyemployee}
          employee = {employeeWithskill}
        />
        <ModalSearchEmployees
          showModal = {showModalSearchEmployees}
          setShowModal = {setshowModalSearchEmployees}
          employees = {employeesSearch}
          skill = {skillToShow}
        />
        {showModalSearchEmployeesExpert ? (
            <ModalSearchEmployeesExpert
              showModal = {showModalSearchEmployeesExpert}
              setShowModal = {setShowModalSearchEmployeesExpert}
              employees = {employeesSearch}
            />
          ) : (
            <> </>
        )}
        {showModalModalSearchEmployeesBySkillAndLevelId ? (
          <ModalSearchEmployeesBySkillAndLevelId
            showModal={showModalModalSearchEmployeesBySkillAndLevelId}
            setShowModal = {setShowModalModalSearchEmployeesBySkillAndLevelId}
            employees = {employeesSearch}
            skillsLevel = {searchSkillAndLevel}
          />
        ) : (null)}

      </Container>
    ) : (
        <UnAuthorized/>      
    )}</motion.div>
  );

}
export default Home;