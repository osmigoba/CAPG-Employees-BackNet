
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import  { DeleteEmployeeSkill}  from '../../httpService.js';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
//import { Table } from 'react-bootstrap/Table';
const ModalEmployeeSkills = ({showModal, setShowModal, skillstoShow, setSkillsToshow,employee}) => {

  // useEffect ( () => {
  //   console.log("paso por aqui useffect")
  // }, [skillstoShow])


  const closeModal = () => {
    setShowModal(false)
  }

  const onHandleRemove = async (item) => {

    let responseConfirm = window.confirm("Do you really want to delete the skill?")
    if (!responseConfirm){
      return;
    }
    const response = await DeleteEmployeeSkill(item.skillId, employee.id);

    if (response.status !== 200){
      window.confirm("There was a problem deleting this skill")
      return;
    }
    let skills = [...skillstoShow]
    skills = skills.filter(skill => skill.skillId !== item.skillId)
    setSkillsToshow(skills)
    //closeModal();
    
  }

  return (
    
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>View Skills</Modal.Header>
        <Modal.Body>
          <Table className='table table-striped' bordered>
            <thead className='text-dark'>
              <tr>
                <th>#</th>
                <th>Skill</th>
                <th>Level</th>
                <th>Exp.</th>

              </tr>
             </thead>
             <tbody>
                { skillstoShow.map( (item, index) =>(
                    <tr key={item.skillId}>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => onHandleRemove(item)}>Remove</Button> 
                      </td>
                      <td> {item.skill} </td>
                      <td> {item.level} </td>
                      <td> {item.experience} </td>

                    </tr>
                )) }
              </tbody>

          </Table>
        </Modal.Body>
    </Modal>
  )
}

export default ModalEmployeeSkills