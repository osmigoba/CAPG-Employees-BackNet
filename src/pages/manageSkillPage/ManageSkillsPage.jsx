import React, {useEffect, useState} from 'react';
import  './ManageSkillPage.scss'
import { Container, Row, Col } from 'reactstrap';
import { Button, FormGroup, Label, Input} from 'reactstrap';
import { Table } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux'
import UnAuthorized from '../unAuthorized/unAuthorizedComponent.jsx'
import { motion } from "framer-motion"
import Swal from 'sweetalert2'
import { deleteSkillRedux, addSkillRedux } from '../../features/skills/skillsSlice'
import { deleteSkillsOfEmployeesBySkillId } from '../../features/skillsofEmployees/skillsofEmployeesSlice'
const skillObject = {
  skill: ""
}
const ManageSkillsPage = () => {

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
  })

  const [skillData, setSkill] = useState(skillObject)

  // The state from Redux
  const dispatch = useDispatch()
  const { isSuccess } = useSelector((state) => state.auth)
  const token = JSON.parse(localStorage.getItem('token'))
  const skillssState  = useSelector((state) => state.skillsState)
  const  {skills}  = skillssState;

  const skillEmployeesStatus = useSelector((state) => state.skillsOfEmployeesState)
  const {skillsOfEmployees} = skillEmployeesStatus 
  useEffect ( () => {

  }, [])
  

  const updateData = (e) => {
    setSkill({
      ...skillData,
      [e.target.name]: e.target.value
    })
}

  const addSkill = async ( skillData, token) => {

    if (skillData.skill.length === 0) {
      await Toast.fire({
        title: `Enter a Valid skill`,
        icon: 'error',
        timer: 1500,
        position: "top"
      })
      return;
    }
    const isFound = skills.some(element => {
      if (element.skill.toLowerCase() === skillData.skill.toLowerCase()){
        return true
      }
      return false
    });

    if (isFound){
      Swal.fire({
        text: `Enter a new skill, ${skillData.skill.toUpperCase()} already exists`,
        icon: 'error',
        confirmButtonColor: "#0066FF",
        showCloseButton: true,
        timer: 2000, 
        position: "top"
      })
      return;
    }
    try {
      await dispatch(addSkillRedux(skillData)).unwrap()
      await Toast.fire({
        title: `The skill ${skillData.skill.toUpperCase()} has been added to the catalogue`,
        icon: 'success',
        confirmButtonColor: "#0066FF",
        showCloseButton: true,
        timer: 1500,
        position: "top"
      })
      setSkill(skillObject)
      
    } catch (error){
      await Toast.fire({
        title: `Error Adding skill ${error}`,
        icon: 'error',
        timer: 1500,
        position: "top"
      })     
    }

  }

const onHandleDelete = async (skillToDelete, token) => {
  const listSkills = skillsOfEmployees.filter(skill => skill.skillID === skillToDelete.id)
  let textToShow;
  if (listSkills.length > 0){
    textToShow = `This skill ${skillToDelete.skill} has been assigned to ${listSkills.length} ${listSkills.length === 1 ? 'employee': 'employees'}, Do you want to delete it?`;
  } else {
    textToShow = `Are you sure you want to delete the Skill:  ${skillToDelete.skill}?`;
  }
  await Swal.fire({
    text: textToShow,
    icon: 'question',
    confirmButtonColor: "#F44336",
    showCancelButton: true,
    showCloseButton: true,
    position:"top",
  }).then(async response  => {
    if (response.isConfirmed){
      try {
        await dispatch(deleteSkillRedux(skillToDelete.id)).unwrap()
        dispatch(deleteSkillsOfEmployeesBySkillId(skillToDelete.id))
        await Toast.fire({
          title: `Skill ${skillToDelete.skill} deleted`,
          icon: 'success',
          timer: 1500,
          position: "top"
        })
      } catch(error) {
        console.log("Error catch: ",error)
        await Toast.fire({
          title: `Error deleting skill ${error}`,
          icon: 'error',
          timer: 1500,
          position: "top"
        })
      } 
    }
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
          <FormGroup className='group1'>
            <Label className='addSkillLabel'>Add Skill</Label>
            <Input name='skill' placeholder="Enter Skill" onChange={(e) => updateData(e)} value = {skillData.skill}/>
          </FormGroup>        
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Button color="primary" size="sm" onClick={() => addSkill(skillData, token)}>Add</Button>
            </FormGroup>
          </Col>        
        </Row>
        <Row>
        <div>
        <FormGroup>
              <Table className='table table-striped' bordered={true} size="sm" hover='true'>
                <thead className='text-dark' bordered='true'>
                  <tr>
                    <th> # </th>
                    <th>Skills</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  { skills.map( (item) =>(
                    <tr key={item.id}>
                      <td> { item.id } </td>
                      <td> {item.skill}</td>
                      <td>
                        <Button color="danger" size="sm" onClick={() => onHandleDelete(item, token)}>Delete</Button>
                      </td>
                    </tr>
                  )) }
                </tbody>
              </Table>          
            </FormGroup>        
        </div>
        </Row>
      </Container>
      ) : (
        <UnAuthorized/>
    )}</motion.div>
  )
}

export default ManageSkillsPage