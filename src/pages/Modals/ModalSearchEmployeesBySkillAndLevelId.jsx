import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const ModalSearchEmployeesBySkillAndLevelId = ({showModal, setShowModal, employees, skillsLevel}) => {

    const closeModal = () => {
        setShowModal(false)
        }
      
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton><b>{employees.length} Employees with skill {skillsLevel[0].skill} and level {skillsLevel[0].level}</b></Modal.Header>
        <Modal.Body>
        <Table className='table table-striped' bordered='true' size="sm" hover='true'>
                  <thead className='text-dark'>
                    <tr>
                      <th> # </th>
                      <th>Name</th>                      
                      {/* <th>Designation</th> */}
                      <th>Skill</th>
                      <th>Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    { employees && employees.map( (employee, index) =>(
                        <tr key={employee.id}>
                          <td> {employee.id}</td>
                          <td> {employee.firstName + " "+employee.lastName} </td>
                          {/* <td> {employee.designation} </td> */}
                          <td> {skillsLevel[index].skill} </td>
                          <td> {skillsLevel[index].level} </td>
                        </tr>
                    )) }
                  </tbody>
                </Table>
        </Modal.Body>
    </Modal>
  )
}

export default ModalSearchEmployeesBySkillAndLevelId