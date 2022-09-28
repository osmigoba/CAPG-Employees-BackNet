import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const ModalSearchEmployeesByExpertise = ({showModal, setShowModal, employees}) => {

    const closeModal = () => {
        setShowModal(false)
        }
      
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton><b>{employees.length} Registers Found with the Expertise </b></Modal.Header>
        <Modal.Body>
        <Table className='table table-striped' bordered size="sm">
                  <thead className='text-dark'>
                    <tr>
                      <th> # </th>
                      <th>Name</th>                      
                      <th> Skill</th>
                      <th> Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    { employees && employees.map( (employee) =>(
                        <tr key={employee.key}>
                          <td> {employee.id}</td>
                          <td> {employee.firstName + " "+employee.lastName} </td>
                          <td> {employee.skill}</td>
                          <td> {employee.levelName}</td>
                        </tr>
                    )) }
                  </tbody>
                </Table>
        </Modal.Body>
    </Modal>
  )
}

export default ModalSearchEmployeesByExpertise