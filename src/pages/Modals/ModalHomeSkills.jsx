
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';
import Modal from 'react-bootstrap/Modal';

import Table from 'react-bootstrap/Table';
//import { Table } from 'react-bootstrap/Table';

const ModalHomeSkills = ({showModal, setShowModal, skillstoShow}) => {

const closeModal = () => {
  setShowModal(false)
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
                      <td> {item.skillId} </td>
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

export default ModalHomeSkills