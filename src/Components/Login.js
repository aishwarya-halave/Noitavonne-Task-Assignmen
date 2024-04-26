import React, { useEffect, useState } from 'react';
import { Link, NavLink, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { fetchData } from "../axiosConfig"
import { useAuth } from './AuthContext';
import { CardHeader, Col, Container, FormGroup, Navbar, Row, Tab, Tabs } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Register from './Register';
import Navigation from './Navigation';


const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const history = useHistory();
    const { login } = useAuth();
    const [data, setData] = useState(0);
    const [counter, setCounter] = useState(0);
    // const [shouldRedirect, setShouldRedirect] = useState(false);
    // const { user } = useAuth(); // Get user object from AuthContext
    // const [filteredData, setFilteredData] = useState([]);
    const handleClick = () => {
        // Perform some action that triggers redirection
        history.push('/register');
    };

    useEffect(() => {
        // Load counter value from localStorage when component mounts
        const storedCounter = parseInt(localStorage.getItem('counter'));
        if (!isNaN(storedCounter)) {
            setCounter(storedCounter);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCounter = () => {
        const updatedCounter = counter + 1;
        setCounter(updatedCounter); // Increment the counter
        // Store the updated counter value in localStorage
        localStorage.setItem('counter', updatedCounter.toString());
        console.log("sd", counter)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {


            const data = await fetchData();
            console.log("hii", data)
            const user = data.find(item => item.email === formData.email && item.password === formData.password);
            if (user) {
                // Login successful, redirect to appropriate route based on user's role

                login(user, user.role);
                // setError('SUCESS');
                // setUser({ ...user, user.role });
                handleLogin(user);
                // redirectToRoleRoute(user.role);

            } else {
                setError('Invalid email or password');
            }
            // Fetch data based on user's role (assuming user role is already set)
            // const filteredData = data.filter(user => user.email === formData.email);
            // console.log("hi", filteredData)
            // Check if email and password match any user in filtered data
            // const user = filteredData.find(item => item.email === formData.email && item.password === formData.password);
            // if (user) {
            //     // Login successful, redirect to appropriate route based on user's role
            // Login(user, user.role);
            // } else {
            //     setError('Invalid email or password');
            // }
        } catch (error) {
            console.error('Fetch error:', error);
            setError('An error occurred during login');
        }
    };

    const handleLogin = (user) => {
        console.log(user.role, user)
        switch (user.role) {
            case 'end-user':
                history.push('/end-user');
                break;
            case 'tech-support':
                history.push('/tech-support');
                break;
            case 'admin':
                history.push('/admin');
                break;
            default:
                history.push('/');
                break;
        }
    };



    return (
        <Container className='login' fluid>
            <Row className='justify-content-center align-items-center m-0 rounded-4 mt-3'>
                <Col className='p-5 rounded-4 box' md="5">
                    <Row className=" justify-content-center align-items-center p-4 ">
                        <Col md="3">
                            <h1>Login</h1>
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
                                <Form.Control type="password" placeholder="password" name="password" value={formData.password} onChange={handleChange} required />
                            </Col>

                        </Form.Group>
                        <FormGroup as={Row} className=" justify-content-center align-items-center p-4">
                            <Col md="4"><Button as="input" type="submit" value="Submit" /></Col>

                        </FormGroup>
                        <Row className='justify-content-center'>
                            <Col md="6 ">
                                <p>Not yet Registered?  <Link to={{
                                    pathname: '/register',
                                    state: { counter: counter }
                                }} onClick={handleCounter}>Register</Link></p>

                            </Col>
                        </Row>



                    </Form>


                    {/* <ul>
                        <li><Link to="/register">register</Link></li>

                    </ul> */}
                    {error && <p>{error}</p>}
                    {/* < to="/register">Register</NavLink> */}
                </Col>

            </Row >

        </Container >
        // <div>
        //     <h2>Login</h2>
        //     <form c>
        //         <div>
        //             <label>Email:</label>
        //             <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        //         </div>
        //         <div>
        //             <label>Password:</label>
        //             <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        //         </div>
        //         <button type="submit">Login</button>
        //     </form>
        //     {error && <p>{error}</p>} #02AABD → #00CDAC
        // </div >
    );
};

export default Login;
