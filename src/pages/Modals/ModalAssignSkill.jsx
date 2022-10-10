import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormGroup, Label, Input } from 'reactstrap';
import  { AddSkillToEmployee }  from '../../httpService.js';
import { assignSkillOfEmployee } from '../../features/skillsofEmployees/skillsofEmployeesSlice'
import { useSelector, useDispatch} from 'react-redux'
import Swal from 'sweetalert2'


const ModalAssignSkill = ({employee, showModalAddskills, setshowModalAddskills, expertises, skills}) => {
  let modelSkillAdd = {
    skillID: 1,
    skill: '',
    employeeId: 1,
    levelId: 1,
    level:'',
    experience: 1
  }
  const { admin } = useSelector((state) => state.auth)
  const skillEmployeesStatus = useSelector((state) => state.skillsOfEmployeesState)
  const { skillsOfEmployees } = skillEmployeesStatus 
  const [skillAdd, setSkillAdd] = useState( modelSkillAdd )
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
  })
  const dispatch = useDispatch();
  useEffect ( () => {
    if (employee.length !== 0){
      modelSkillAdd.employeeId = employee.id;
      modelSkillAdd.skillID = skills[0].id; 
      modelSkillAdd.levelId = expertises[0].id; 
      modelSkillAdd.experience = 1;
      modelSkillAdd.level = expertises[0].name;
      modelSkillAdd.skill = skills[0].skill;
    }

    setSkillAdd(modelSkillAdd) 
    console.log('useEffect moda addSkill: ',skillAdd) 
  }, [])

  //To close the modal
  const handleClose = () => {
    setshowModalAddskills(false); 
  }
  const AssignSkill = async (event, employeeid) => {
    event.preventDefault();
    console.log('object skillAdd : ', skillAdd)
    // check if that skill exist
    const skillExist = skillsOfEmployees.filter(skill => skill.skillID === skillAdd.skillID && skill.employeeId === employeeid)
    console.log('skill Exist:', skillExist)
    if (skillExist.length !== 0) {
      await Toast.fire({
        title: `🤨 This skill ${skillAdd.skill} already exists: `,
        icon: 'error',
        timer: 1000,
        position: "top"
      }) 
      return      
    }
    try {
      const skillPassed = skillAdd
      await dispatch(assignSkillOfEmployee(skillPassed)).unwrap()
      await Toast.fire({
        title: `The skill ${skillPassed.skill} has been assigned to employee ${employee.firstName} ${employee.lastName}`,
        icon: 'success',
        timer: 1000,
        position: "top"
      })  
      console.log(skillPassed)    
      handleClose()
    } catch(error) {
      await Toast.fire({
        title: `🤨 Error Adding the skill ${skillAdd.skill}, error: ${error.data.error}`,
        icon: 'error',
        timer: 1000,
        position: "top"
      })
    }
  }

  const updateDate = (e) => {


    if (e.target.name === 'levelId'){
      const levelselected = expertises.filter(levelobj => levelobj.id === parseInt(e.target.value));
      setSkillAdd({
        ...skillAdd,
        level: levelselected[0].name,
        [e.target.name]: parseInt(e.target.value),
      })
      return;      
    }

    if (e.target.name === 'skillID') {
      const skillselected = skills.filter(skillobj => skillobj.id === parseInt(e.target.value));
      setSkillAdd({
        ...skillAdd,
        skill: skillselected[0].skill,
        [e.target.name]: parseInt(e.target.value),
      })
      return;
    }
    setSkillAdd({
      ...skillAdd,
      [e.target.name]: parseInt(e.target.value),
    })    
  }  
    
  return (
    <Modal 
    show={showModalAddskills}
    onHide={handleClose}
    >
    <Modal.Header closeButton>
      <Modal.Title>Assign Skill to   {employee.firstName} {employee.lastName}</Modal.Title>
    </Modal.Header>

    <Modal.Body>


        <FormGroup>
            <Label >Select The Expert Level</Label>
            <Input type="select"  onChange={(e) => updateDate(e)} name="levelId" >
                { expertises.map( (expertise, index) =>(
                    <option key={index} value={expertise.id} >{expertise.id}. {expertise.name}</option> 
                )) }
            </Input>
        </FormGroup>  

        <FormGroup>
            <Label >Select The Skill</Label>
            <Input type="select" onChange={(e) => updateDate(e)} name="skillID">
            { skills.map( (skill, index) =>(
                <option key={index} value={skill.id}> {skill.skill} </option> 
            ))}
            </Input>
        </FormGroup>  

        <FormGroup>
            <Label >Type the Years of Experience</Label>
            <Input type="text" placeholder="1" onChange={(e) => updateDate(e)} name="experience" >
            </Input>
        </FormGroup>          

    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
      <Button variant="success" onClick={(event) => AssignSkill(event, employee.id)} disabled={ admin ? false : true }>Save</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalAssignSkill