// RegistrationForm.js
import React, { useEffect, useState } from 'react';

import { createUser } from "../axiosConfig"
import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
const Register = () => {
    const location = useLocation();
    const { counter } = location.state || {}; // Access the counter value from location state
    console.log("hii", counter);
    // const [formDataList, setFormDataList] = useState([]);
    const [formData, setFormData] = useState({ id: 0, email: '', password: '', role: '' });
    // const [counter, setCounter] = useState(0);

    // const handleAddForm = () => {
    //     setFormDataList([...formDataList, { id: counter, email: '', password: '', role: '' }]);
    //     setCounter(counter + 1);
    // };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value, id: counter });
    };

    // const handleChange = (e, id) => {
    //     const { name, value } = e.target;
    //     const updatedFormDataList = formDataList.map(formData => {
    //         if (formData.id === id) {
    //             return { ...formData, [name]: value, id: { counter } };
    //         }
    //         return formData;
    //     });
    //     setFormData(updatedFormDataList);
    // };

    // const handleSubmit = (e, id) => {
    //     e.preventDefault();
    //     const formData = formDataList.find(formData => formData.id === id);
    //     console.log('Submit form with ID:', id, 'Data:', formData);
    //     // You can now submit formData to your backend
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call createUser function to create a new user
            await createUser(formData);
            // Optionally, handle success (e.g., display confirmation message)
            console.log('Registration successful');
        } catch (error) {
            console.error('Registration error:', error);
            // Optionally, handle error (e.g., display error message)
        }
    };

    return (
        <Container className='login p-0 m-0' fluid>
            {/* 
            <button onClick={handleAddForm}>Add Form</button>
            {formDataList.map(formData => (
                <form key={formData.id} onSubmit={(e) => handleSubmit(e, formData.id)}>
                    <input type="email" name="email" value={formData.email} onChange={(e) => handleChange(e, formData.id)} />
                    <input type="password" name="password" value={formData.password} onChange={(e) => handleChange(e, formData.id)} />
                    <select name="role" value={formData.role} onChange={(e) => handleChange(e, formData.id)}>
                        <option value="end-user">End User</option>
                        <option value="tech-support">Tech Support</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
            ))} */}
            <Row className='justify-content-center align-items-center mt-3 rounded-4'>
                <Col className='p-5 rounded-4 box' md="5">
                    <Row className=" justify-content-center align-items-center p-4 ">
                        <Col md="4">
                            <h1>Register</h1>
                        </Col>
                    </Row>

                    <Form className='' onSubmit={handleSubmit}>
                        <Form.Group as={Row} className=" justify-content-center align-items-center p-4 " controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Email
                            </Form.Label>
                            <Col sm="2" md="5">
                                <Form.Control placeholder="name@email.com" name="email" value={formData.email} onChange={handleChange} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className=" justify-content-center align-items-center p-4" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Password
                            </Form.Label>
                            <Col md="5">
                                <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
                            </Col>

                        </Form.Group>
                        <Form.Group as={Row} className="justify-content-center align-items-center p-4">
                            <Form.Label column sm="2">Role</Form.Label>
                            <Col md="5">
                                <Form.Select name="role" value={formData.role} onChange={handleChange}>
                                    <option value={"end-user"}>End User</option>
                                    <option value={"tech-support"}>Tech Support</option>
                                    <option value={"admin"}>Admin</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className=" justify-content-center align-items-center p-4">
                            <Col md="5"><Button as="input" type="submit" value="Submit" /></Col>
                        </Form.Group>



                    </Form>



                </Col>

            </Row >

        </Container >

        // <form onSubmit={handleSubmit}>
        //     <div>
        //         <label>Email:</label>
        //         <input type="email" name="email" value={formData.email} onChange={handleChange} />
        //     </div>
        //     <div>
        //         <label>Password:</label>
        //         <input type="password" name="password" value={formData.password} onChange={handleChange} />
        //     </div>
        //     <div>
        //         <label>Role:</label>
        //         <select name="role" value={formData.role} onChange={handleChange}>
        //             <option value="">Select Role</option>
        //             <option value="end-user">End User</option>
        //             <option value="tech-support">Tech Support</option>
        //             <option value="admin">Admin</option>
        //         </select>
        //     </div>
        //     <button type="submit">Register</button>
        // </form>
    );
};

export default Register;
