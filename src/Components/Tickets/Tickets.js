// TicketList.js
import React, { useEffect, useState } from 'react';
import { fetchTickets } from '../../axiosConfigTickets';
import { Col, Container, Row, Table } from 'react-bootstrap';

const Tickets = () => {
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
                setTickets(myTickets);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        allTickets();
    }, []);

    return (
        <Container className='login' fluid>
            <Row className='justify-content-center'>
                <Col className='m-4'>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Ticket No.</th>
                                <th>Ticket Title</th>
                                <th>Ticket Description</th>
                                <th>Ticket Priority</th>
                                <th>Status</th>

                            </tr>
                        </thead>
                        {tickets.map((ticket) => (

                            <tbody>
                                <tr>
                                    <td>{ticket.id}</td>
                                    <td>{ticket.title}</td>
                                    <td>{ticket.description}</td>
                                    <td>{ticket.priority}</td>
                                    <td>{ticket.status}</td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>

                </Col>
            </Row>
        </Container>
    );
};

export default Tickets;


