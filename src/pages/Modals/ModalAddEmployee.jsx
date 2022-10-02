import React, { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormGroup, Label, Input } from 'reactstrap';
// import  { AddEmployee }  from '../../httpService.js';
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { addEmployeeRedux, resetAddState } from '../../features/employees/employeesSlice'


const modelEmployee = {

    firstName: "",
    lastName: "",
    doj: "",
    designation: "",
    email: ""
}

const ModalAddEmployee = ({showModalAddEmployee, setshowModalAddEmployee}) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
  })
  const [employee, setEmployee] =  useState(modelEmployee);

  ///////////////////  REDUX TOOLKIT //////////////////////////
  const dispatch = useDispatch()
    const updateData = (e) => {
        setEmployee({
          ...employee,
          [e.target.name]: e.target.value
        })
    }  


    const addEmployee = async (employeeData) => {
       try {
          await dispatch(addEmployeeRedux(employeeData)).unwrap()
          await Toast.fire({
            title: `Employee ${employeeData.firstName} ${employeeData.lastName} created`,
            icon: 'success',
            timer: 1500,
            position: "top"
          }) 
          dispatch(resetAddState())
          setEmployee([]);
          handleClose();
       } catch (error) {
          await Toast.fire({
            title: `Error Creating Employee ${error}`,
            icon: 'success',
            timer: 1500,
            position: "top"
          })          
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

            <Button variant="success" onClick={() => addEmployee(employee)}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      );
    };
export default ModalAddEmployee