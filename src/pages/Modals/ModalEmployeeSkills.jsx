import React from 'react';
import Modal from 'react-bootstrap/Modal';
import  { DeleteEmployeeSkill}  from '../../httpService.js';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
const ModalEmployeeSkills = ({showModal, setShowModal, skillstoShow, setSkillsToshow,employee}) => {

  const { token } = useSelector((state) => state.auth.user)
  const closeModal = () => {
    setShowModal(false)
  }
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
  })
  const onHandleRemove = async (item, token) => {
    await Swal.fire({
      text: `Are you sure you want to delete the Skill:  ${item.skill}?`,
      icon: 'question',
      confirmButtonColor: "#D32F2F ",
      showCancelButton: true,
      showCloseButton: true
    }).then(async res => {
      if (res.isConfirmed){
        const response = await DeleteEmployeeSkill(item.skillID, employee.id, token);
        if (response.status !== 200){
          window.confirm("There was a problem deleting this skill")
          return;
        }
        await Toast.fire({
          title: `The skill ${item.skill} has been deleted`,
          icon: 'success',
          timer: 1500,
          position: "top"
        })
        let skills = [...skillstoShow]
        skills = skills.filter(skill => skill.skillID !== item.skillID)
        setSkillsToshow(skills)          
      }
    })
  }

  return (
    
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton><b>View Skills</b></Modal.Header>
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
                        <Button variant="danger" size="sm" onClick={() => onHandleRemove(item, token)}>Remove</Button> 
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