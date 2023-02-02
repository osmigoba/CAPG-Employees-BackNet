import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch  } from 'react-redux'
import { deleteSkillOfEmployee, resetDeleteSkillOfEmployeeState } from '../../features/skillsofEmployees/skillsofEmployeesSlice'
import Swal from 'sweetalert2'
const ModalEmployeeSkills = ({showModal, setShowModal, skillstoShow, setSkillsToshow, employee}) => {
  const { token } = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
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
        try {
          await dispatch(deleteSkillOfEmployee(item)).unwrap()
          dispatch(resetDeleteSkillOfEmployeeState())

          await Toast.fire({
            title: `Skill of the employee deleted`,
            icon: 'success',
            timer: 1000,
            position: "top"
          })
          const newskills = skillstoShow.filter((skillemployee) => skillemployee.skillID !== item.skillID)
          setSkillsToshow(newskills)
        } catch(error) {
          await Toast.fire({
            title: `Error Deleting skill ${error}`,
            icon: 'error',
            timer: 1500,
            position: "top"
          }) 
        }        
      }
    })
  }

  return (
    
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton><b>View Skills of {employee.firstName} {employee.lastName} </b></Modal.Header>
        <Modal.Body>
          <Table className='table table-striped' bordered='true' hover='true'>
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
                    <tr key={index}>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => onHandleRemove(item, token)} >Remove</Button> 
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