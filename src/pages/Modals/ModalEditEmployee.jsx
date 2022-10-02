import React, { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormGroup, Label, Input } from 'reactstrap';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { updateEmployeeRedux, resetUpdateState } from '../../features/employees/employeesSlice'
const modelEmployee = {
    id: 0,
    firstName: "",
    lastName: "",
    doj: "",
    designation: "",
    email: ""
}


const ModalEditEmployee = ({showModalEditEmployee, setshowModalEditEmployee, employeeWithSkills}) => {
  const { token } = useSelector((state) => state.auth.user)
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
  })
  const [employee, setEmployee] =  useState(modelEmployee);
  ///////////////////  REDUX TOOLKIT //////////////////////////
  const dispatch = useDispatch()
  useEffect ( () => {
    if (employeeWithSkills.length !== 0){

      setEmployee(employeeWithSkills)
    }

  }, [employeeWithSkills])

    const updateData = (e) => {
        setEmployee({
          ...employee,
          [e.target.name]: e.target.value
        })
    }
    
    const editEmployee = async (employee, token) => {
        try {
          await dispatch(updateEmployeeRedux(employee)).unwrap()
          await Toast.fire({
            title: `Employee ${employee.firstName} ${employee.lastName} Updated`,
            icon: 'success',
            timer: 1500,
            position: "top"
          }) 
          dispatch(resetUpdateState())
          setEmployee([]);
          handleClose();
       } catch (error) {
          await Toast.fire({
            title: `Error Updating the Employee ${error}`,
            icon: 'error',
            timer: 1500,
            position: "top"
          })          
       }        
    }

    const handleClose = () => {setshowModalEditEmployee(false);}
    return (
        <Modal 
          show={showModalEditEmployee}
          onHide={handleClose}
          >
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
    
          <Modal.Body>

                <FormGroup>
                    <Label>First Name</Label>
                    <Input type='text' name='firstName' onChange={(e) => updateData(e)}  defaultValue = {employeeWithSkills && employeeWithSkills.firstName}/>
                </FormGroup>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input type='text' name = 'lastName' onChange={(e) => updateData(e)} defaultValue = {employeeWithSkills && employeeWithSkills.lastName}/>
                </FormGroup>
                <FormGroup>
                    <Label >Email</Label>
                    <Input type='email' name = 'email' onChange={(e) => updateData(e)} defaultValue = {employeeWithSkills && employeeWithSkills.email}/>
                </FormGroup>                
                <FormGroup>
                    <Label>Date of Joining</Label>
                    <Input type='date' name = 'doj' onChange={(e) => updateData(e)} defaultValue = {employeeWithSkills.doj && employeeWithSkills.doj.slice(0, 10)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Designation</Label>
                    <Input type='text' name = 'designation' onChange={(e) => updateData(e)} defaultValue = {employeeWithSkills && employeeWithSkills.designation}/>
                </FormGroup>

          </Modal.Body>
    
          <Modal.Footer>
            <Button variant="success" onClick={() => editEmployee(employee, token)}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default ModalEditEmployee