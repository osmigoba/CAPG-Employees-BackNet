import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormGroup, Label, Input } from 'reactstrap';
import  { AddEmployee }  from '../../httpService.js';
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
const modelEmployee = {

    firstName: "",
    lastName: "",
    doj: "",
    designation: "",
    email: ""
}

const ModalAddEmployee = ({showModalAddEmployee, setshowModalAddEmployee, getAllEmployees}) => {
  const { token } = useSelector((state) => state.auth.user)
    const [employee, setEmployee] =  useState(modelEmployee);

    const updateData = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setEmployee({
          ...employee,
          [e.target.name]: e.target.value
        })
    }  
    
    const addEmployee = async (employee, token) => {
        const response = await AddEmployee(employee, token)

        if (response.status === 201){
          await Swal.fire({
            text: `The Employee # ${employee.firstName}  ${employee.lastName} has been created`,
            icon: 'success',
            confirmButtonColor: "#0066FF",
            showCloseButton: true,
            timer: 2000,
            position: "top"
          })
          setEmployee([]);
          getAllEmployees(token);
          handleClose();  
        }
    }

    const handleClose = () => {setshowModalAddEmployee(false);}

    return (
        <Modal 
          show={showModalAddEmployee}
          onHide={handleClose}
          >
          <Modal.Header closeButton>
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
    
          <Modal.Body>

                <FormGroup>
                    <Label>First Name</Label>
                    <Input type='text' name='firstName' onChange={(e) => updateData(e)} value = {employee.firstName} placeholder="Enter First Name"/>
                </FormGroup>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input type='text' name = 'lastName' onChange={(e) => updateData(e)} value = {employee.lastName} placeholder="Enter Last Name"/>
                </FormGroup>
                <FormGroup>
                    <Label >Email</Label>
                    <Input type='email' name = 'email' onChange={(e) => updateData(e)} value = {employee.email} placeholder="Enter a Valid Email"/>
                </FormGroup>                
                <FormGroup>
                    <Label>Date of Joining</Label>
                    <Input type='date' name = 'doj' onChange={(e) => updateData(e)} value = {employee.doj}/>
                </FormGroup>
                <FormGroup>
                    <Label>Designation</Label>
                    <Input type='text' name = 'designation' onChange={(e) => updateData(e)} value = {employee.designation} placeholder="Enter a Designation, Ej: Developer..."/>
                </FormGroup>

          </Modal.Body>
    
          <Modal.Footer>

            <Button variant="success" onClick={() => addEmployee(employee, token)}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default ModalAddEmployee