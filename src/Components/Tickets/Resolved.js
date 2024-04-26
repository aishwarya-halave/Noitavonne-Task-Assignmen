import React, { useEffect, useState } from 'react'
import { fetchTickets } from '../../axiosConfigTickets';
import { useAuth } from '../AuthContext';
import { Col, Container, Row, Table } from 'react-bootstrap';

const Resolved = (props) => {
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
                const myTickets = allTickets.filter(item => item.status === "resolved");
                setTickets(myTickets);
                // const userTickets = await 
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        allTickets();
    }, []);

    return (
        <Container fluid className='login'>
            <Row className='justify-content-center m-0 rounded-4'>

                <Col className='m-4'>
                    <Table striped bordered hover variant="dark" >
                        <thead >
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
    )
}

export default Resolved