import React from 'react';
import { useAuth } from './AuthContext';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import TechSupportTickets from './TechSupportTickets';
import { FaUserCog } from "@react-icons/all-files/fa/FaUserCog";
import OpenTickets from './Tickets/OpenTickets';
import Resolved from './Tickets/Resolved';

const TechSupport = () => {
    const { user } = useAuth();
    return (
        <>
            {
                user && user.role === 'tech-support' && (
                    <Row className='justify-content-center'>
                        <Col md="1">
                            <FaUserCog size={100} />
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
                                    <TechSupportTickets />
                                </Tab>
                                <Tab eventKey="resolvedTickets" title="Resolved Tickets">
                                    <Resolved />
                                </Tab>
                            </Tabs>
                        </Container>
                    </Row>

                )}
        </>



        // {
        //     user && user.role === 'tech-support' && (
        //         <Container className='login p-0 m-0' fluid>
        //             <Row className='justify-content-center align-items-center m-0 rounded-4'>
        //                 <div>

        //                     {/* <h1>Welcome, Tech Support!</h1> */}
        //                     <Container fluid>

        //                     </Container>
        //                 </div>
        //             </Row>
        //         </Container>
        //     )
        // }
        // </div >
    );
};

export default TechSupport;
