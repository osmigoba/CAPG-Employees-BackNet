import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const ModalSearchEmployeesBySkill = ({showModal, setShowModal, employees, skill}) => {

    const closeModal = () => {
        setShowModal(false)
        }
      
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton><b>{employees.length} Employees found with {skill} skill </b></Modal.Header>
        <Modal.Body>
        <Table className='table table-striped' bordered='true' size="sm">
                  <thead className='text-dark'>
                    <tr>
                      <th> # </th>
                      <th>Name</th>                      
                      <th>Designation</th>

                    </tr>
                  </thead>
                  <tbody>
                    { employees && employees.map( (employee) =>(
                        <tr key={employee.id}>
                          <td> {employee.id}</td>
                          <td> {employee.firstName + " "+employee.lastName} </td>
                          <td> {employee.designation} </td>

                        </tr>
                    )) }
                  </tbody>
                </Table>
        </Modal.Body>
    </Modal>
  )
}

export default ModalSearchEmployeesBySkill