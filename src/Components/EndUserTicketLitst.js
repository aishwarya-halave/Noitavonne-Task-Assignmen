import React, { useEffect, useState } from 'react';
import { fetchTickets, updateTicket } from '../axiosConfigTickets';
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { FaWindowClose } from "@react-icons/all-files/fa/FaWindowClose";

const EndUserTicketList = ({ ticketId }) => {
    const { user } = useAuth();
    const [tickets, setTickets] = useState([
        {
            "id": "",
            "title": "",
            "description": "",
            "priority": "",
            "status": "",
            "created_by": "",
        }
    ]);

    useEffect(() => {
        const allTickets = async () => {
            try {
                const allTickets = await fetchTickets();
                const myTickets = allTickets.filter(item => item.email === user.email);
                setTickets(myTickets);
                // const userTickets = await 
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
                // resolvedBy: user.email,
                // resolutionNotes: 'Issue resolved successfully.'
            };
            await updateTicket(id, updatedData);
            setTickets((prevTickets) =>
                prevTickets.map((ticket) =>
                    ticket.id === id ? { ...ticket, status: "close" } : ticket
                )
            );
            // Optionally, update the UI to reflect the closed ticket status
        } catch (error) {
            console.error('Close ticket error:', error);
        }
    };

    return (

        <Container fluid className='login'>
            <Row>
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


        </Container>
    );
};

export default EndUserTicketList;