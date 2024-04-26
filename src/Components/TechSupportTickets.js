import React, { useEffect, useState } from 'react';
import { closeTicketById, fetchTickets, updateTicket } from '../axiosConfigTickets';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { FaWindowClose } from "@react-icons/all-files/fa/FaWindowClose";

const TechSupportTickets = () => {
    const { user } = useAuth()
    const [tickets, setTickets] = useState([
        {
            "id": "",
            "title": "",
            "description": "",
            "priority": "",
            "status": ""
        }
    ]);

    useEffect(() => {
        const allTickets = async () => {
            try {
                const allTickets = await fetchTickets();
                const myTickets = allTickets.filter(item => item.status === "open");
                // console.log("my tickets", myTickets)
                setTickets(myTickets);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        allTickets();
    }, []);


    const handleCloseTicket = async (id) => {
        try {
            const updatedData = {
                // Include any updated fields here
                status: "close",
                // resolvedBy: 'John Doe',
                // resolutionNotes: 'Issue resolved successfully.'
            };
            await updateTicket(id, updatedData);
            console.log('Ticket closed successfully');
            setTickets((prevTickets) =>
                prevTickets.map((ticket) =>
                    ticket.id === id ? { ...ticket, status: 'close' } : ticket
                )
            );
            // Optionally, update the UI to reflect the closed ticket status
        } catch (error) {
            console.error('Close ticket error:', error);
        }
    };

    const handleResolveTicket = async (id) => {

        try {
            const updatedData = {
                // Include any updated fields here
                status: "resolved",
                resolvedBy: user.email,
                role: user.role,
            };
            console.log("id", id)
            await updateTicket(id, updatedData);
            console.log('Ticket resolved successfully');
            setTickets((prevTickets) =>
                prevTickets.map((ticket) =>
                    ticket.id === id ? { ...ticket, status: 'resolved' } : ticket
                )
            );
            // Optionally, update the UI to reflect the resolved ticket status
        } catch (error) {
            console.error('Resolve ticket error:', error);
        }
    };


    return (
        <Container fluid className='login'>
            <Row className='justify-content-center'>
                <Col className='m-4'>

                    <Table striped bordered hover variant="dark" >
                        <thead >
                            <tr>
                                <th>Ticket No.</th>
                                <th>Ticket Title</th>
                                <th>Ticket Description</th>
                                <th>Ticket Priority</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        {tickets.map((ticket) => (

                            <tbody key={ticket.id}>
                                <tr>
                                    <td>{ticket.id}</td>
                                    <td>{ticket.title}</td>
                                    <td>{ticket.description}</td>
                                    <td>{ticket.priority}</td>
                                    <td>{ticket.status}</td>
                                    <td>
                                        <Row className='justify-content-'>
                                            <Col>
                                                <Button onClick={() => handleResolveTicket(ticket.id)}>Resolve Ticket</Button>
                                            </Col>
                                            <Col>
                                                <Button className='btn btn-transparent' onClick={() => handleCloseTicket(ticket.id)}><FaWindowClose /></Button>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                </Col>
            </Row>
        </Container >

    );
};

export default TechSupportTickets;