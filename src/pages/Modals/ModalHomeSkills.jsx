import React from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

const ModalHomeSkills = ({
  showModal,
  setShowModal,
  skillstoShow,
  employee,
}) => {
  const closeModal = () => {
    setShowModal(false);
  };
  console.log(employee);
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          <b>
            View Skills of {employee.firstName} {employee.lastName}{" "}
          </b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table className="table table-striped" bordered="true" hover='true'>
          <thead className="text-dark">
            <tr>
              <th>#</th>
              <th>Skill</th>
              <th>Level</th>
              <th>Exp.</th>
            </tr>
          </thead>
          <tbody>
            {skillstoShow.map((item) => (
              <tr key={item.skillID}>
                <td> {item.skillID} </td>
                <td> {item.skill} </td>
                <td> {item.level} </td>
                <td> {item.experience} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default ModalHomeSkills;
