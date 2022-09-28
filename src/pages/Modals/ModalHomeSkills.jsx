import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';


const ModalHomeSkills = ({showModal, setShowModal, skillstoShow}) => {

const closeModal = () => {
  setShowModal(false)
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
                { skillstoShow.map( (item) =>(
                    <tr key={item.skillID}>
                      <td> {item.skillID} </td>
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