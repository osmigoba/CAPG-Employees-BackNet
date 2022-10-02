import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const ModalSearchEmployeesByExpertise = ({showModal, setShowModal, employees}) => {

    const closeModal = () => {
        setShowModal(false)
        }
      
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton><b>{employees.length} Registers Found with the Expertise {employees[0].levelName}</b></Modal.Header>
        <Modal.Body>
        <Table className='table table-striped' bordered='true' size="sm">
                  <thead className='text-dark'>
                    <tr>
                      <th> # </th>
                      <th>Name</th>                      
                      <th> Designation</th>
                      <th> Skill</th>
                    </tr>
                  </thead>
                  <tbody>
                    { employees && employees.map( (employee, index) =>(
                        <tr key={ index }>
                          <td> {employee.id}</td>
                          <td> {employee.firstName + " "+employee.lastName} </td>
                          <td> {employee.designation}</td>
                          <td> {employee.skill}</td>
                        </tr>
                    )) }
                  </tbody>
                </Table>
        </Modal.Body>
    </Modal>
  )
}

export default ModalSearchEmployeesByExpertise