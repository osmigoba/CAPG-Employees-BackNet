import React, {useEffect, useState} from 'react';
import  './ManageSkillPage.scss'
import  { GetAllSkills, AddSkill, DeleteSkill}  from '../../httpService.js';
import { Container, Row, Col } from 'reactstrap';
import { Button, FormGroup, Label, Input} from 'reactstrap';
import { Table } from 'reactstrap';
import { useSelector } from 'react-redux'
import UnAuthorized from '../unAuthorized/unAuthorizedComponent.jsx'
import { motion } from "framer-motion"
import Swal from 'sweetalert2'
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
  const [ skills, setSkills ] = useState( [] )
  // The state from Redux
  const { isSuccess } = useSelector((state) => state.auth)
  const token = JSON.parse(localStorage.getItem('token'))

  useEffect ( () => {

    if (isSuccess){
      getAllSkills(token);
    }
    
  }, [])
  
  const getAllSkills = async (token) => {
    const response = await GetAllSkills(token)
    setSkills(response)
    return response
  }

  const updateData = (e) => {
    console.log(e.target.name + " : " + e.target.value)
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

    const response = await AddSkill(skillData.skill.toUpperCase(), token)
    if (response.status === 201){
      await Toast.fire({
        title: `The skill ${skillData.skill.toUpperCase()} has been added to the catalogue`,
        icon: 'success',
        confirmButtonColor: "#0066FF",
        showCloseButton: true,
        timer: 1500,
        position: "top"
      })

      setSkill(skillObject);
      getAllSkills(token);
    }
  }

const onHandleDelete = async (item, token) => {

  await Swal.fire({
    text: `Are you sure you want to delete the Skill:  ${item.skill}?`,
    icon: 'question',
    confirmButtonColor: "#F44336",
    showCancelButton: true,
    showCloseButton: true,
    position:"top",
  }).then(async response  => {
    if (response.isConfirmed){
      const response = await DeleteSkill(item.id, token);
      console.log(response)
      if (response.status === 200){
        getAllSkills(token);
        await Toast.fire ({
          text: `skill ${item.skill} deleted from Catalogue`,
          icon: 'success',
          confirmButtonColor: "#F44336",
          showCloseButton: true,
          position:"top",
          timer: 1500
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
              <Table className='table table-striped' bordered size="sm">
                <thead className='text-dark' bordered>
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