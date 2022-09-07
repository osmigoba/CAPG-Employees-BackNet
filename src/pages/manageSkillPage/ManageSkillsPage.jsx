import React, {useEffect, useState} from 'react';
import  './ManageSkillPage.scss'
import  { GetAllSkills, AddSkill, DeleteSkill}  from '../../httpService.js';
import { Container, Row, Col } from 'reactstrap';
import { Button, FormGroup, Label, Input} from 'reactstrap';
import { Table } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const skillObject = {
  skill: ""
}

const ManageSkillsPage = () => {

  const [skillData, setSkill] = useState(skillObject)
  const [ skills, setSkills ] = useState( [] )
  // The state from Redux
  const { user, isSuccess } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect ( () => {
    getAllSkills();
    if (!isSuccess){
      navigate("/") // Navigate to login  
    }
    getAllSkills();
  }, [])
  
  const getAllSkills = async () => {
    const response = await GetAllSkills()
    setSkills(response.result)
    return response
  }

  const updateData = (e) => {
    console.log(e.target.name + " : " + e.target.value)
    setSkill({
      ...skillData,
      [e.target.name]: e.target.value
    })
}

const addSkill = async ( skillData) => {

  if (skillData.skill.length === 0) {
    window.confirm("Enter a Skill")
    return;
  }
  const isFound = skills.some(element => {
    if (element.skill.toLowerCase() === skillData.skill.toLowerCase()){
      return true
    }
    return false
  });
  if (isFound){
    window.confirm("Enter a new Skill, This skills already exists")
    return;
  }

  const response = await AddSkill(skillData.skill)
  if (response.status === 200){
    window.confirm("The new Skill has been saved")
    setSkill([]);
    getAllSkills();
  }
}

const onHandleDelete = async (item) => {
  const res = window.confirm("Are you sure yo want to delete this Skill?")
  if (res){
    const response = await DeleteSkill(item.id);
    if (response.status === 200){
      getAllSkills();
    }
  }
  console.log(res)
  console.log(item)
}

  return (
    <Container>
      <Row>
        <FormGroup className='group1'>
          <Label className='addSkillLabel'>Add Skill</Label>
          <Input name='skill' placeholder="Enter Skill" onChange={(e) => updateData(e)}/>
        </FormGroup>        
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Button color="primary" size="sm" onClick={() => addSkill(skillData)}>Add</Button>
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
                      <Button color="danger" size="sm" onClick={() => onHandleDelete(item)}>Delete</Button>
                    </td>
                  </tr>
                )) }
              </tbody>
            </Table>          
          </FormGroup>        
      </div>
      </Row>
    </Container>
  )
}

export default ManageSkillsPage