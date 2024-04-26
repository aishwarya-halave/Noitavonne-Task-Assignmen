import React from 'react';
import { useAuth } from './AuthContext';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { RiAdminFill } from "@react-icons/all-files/ri/RiAdminFill";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Tickets from './Tickets/Tickets';
import Resolved from './Tickets/Resolved';
import OpenTickets from './Tickets/OpenTickets';
const AdminComponent = () => {
    const { user } = useAuth();

    return (
        <Container fluid>
            {console.log("in admin page", user)}
            {user && user.role === 'admin' && (
                <Row className='justify-content-center pt-4'>
                    <Col>
                        <RiAdminFill size={80} />
                    </Col>

                    <Col md="11">

                        <h1>Welcome {user.role}</h1>
                        <p>{user.email}</p>
                    </Col>
                    <Container fluid>
                        <Tabs
                            defaultActiveKey="profile"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="allTickets" title="All Tickets">
                                <Tickets />
                            </Tab>
                            <Tab eventKey="openTickets" title="Open Tickets">
                                <OpenTickets />
                            </Tab>
                            <Tab eventKey="resolvedTickets" title="Resolved Tickets">
                                <Resolved />
                            </Tab>
                        </Tabs>

                    </Container>
                </Row>
            )}
        </Container>
    );
};

export default AdminComponent;
