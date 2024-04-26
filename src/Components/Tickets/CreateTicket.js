import React, { useState } from 'react';
import { createTicket } from '../../axiosConfigTickets';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useAuth } from '../AuthContext';

const CreateTicket = ({ ticketId, handleCounter }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    id: ticketId,
    title: "",
    description: "",
    priority: "",
    status: "open",
    email: user.email
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = { ...formData, id: ticketId }; // Set the ticketId to the id field in formData
      await createTicket(updatedFormData); // Create the ticket with updated formData
      handleCounter(); // Increment ticketId  
      alert("Ticket created successfully.");
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <Container>
      <Col className='p-5 rounded-4 box'>
        <Row className=" justify-content-center align-items-center p-4 ">
          <Col md="4">
            <h1>Create Ticket</h1>
          </Col>
        </Row>

        <Form className='' onSubmit={handleSubmit}>
          <Form.Group as={Row} className=" justify-content-center align-items-center p-4 " controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="2" md="5">
              <Form.Control type="email"
                name="email"
                // value={user.email}
                placeholder={user.email}
                disabled />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className=" justify-content-center align-items-center p-4 " controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Title
            </Form.Label>
            <Col sm="2" md="5">
              <Form.Control type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className=" justify-content-center align-items-center p-4" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Description
            </Form.Label>
            <Col md="5">
              <Form.Control name="description"
                value={formData.description}
                onChange={handleChange}
                required />
            </Col>

          </Form.Group>
          <Form.Group as={Row} className="justify-content-center align-items-center p-4">
            <Form.Label column sm="2">Priority</Form.Label>
            <Col md="5">
              <Form.Select name="priority"
                value={formData.priority}
                onChange={handleChange}>
                <option value={"low"}>low</option>
                <option value={"medium"}>medium</option>
                <option value={"high"}>high</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className=" justify-content-center align-items-center p-4">
            <Col md="5"><Button as="input" type="submit" value="Submit" /></Col>
          </Form.Group>
        </Form>
      </Col>
    </Container>



    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label>Title:</label>
    //     <input
    //       type="text"
    //       name="title"
    //       value={formData.title}
    //       onChange={handleChange}
    //       required
    //     />
    //   </div>
    //   <div>
    //     <label>Description:</label>
    //     <textarea
    //       name="description"
    //       value={formData.description}
    //       onChange={handleChange}
    //       required
    //     ></textarea>
    //   </div>
    //   <div>
    //     <label>Priority:</label>
    //     <select
    //       name="priority"
    //       value={formData.priority}
    //       onChange={handleChange}
    //     >
    //       <option value="low">Low</option>
    //       <option value="medium">Medium</option>
    //       <option value="high">High</option>
    //     </select>
    //   </div>
    //   <button type="submit">Submit</button>
    // </form>
  );
};

export default CreateTicket;
