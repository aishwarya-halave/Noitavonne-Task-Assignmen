import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';
import CreateTicket from './Tickets/CreateTicket';
import EndUserTicketList from './EndUserTicketLitst';
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import OpenTickets from './Tickets/OpenTickets';

const EndUserComponent = () => {
  const { user } = useAuth();
  const [ticketData, setTicketData] = useState({
    title: '',
    description: '',
    files: []
  });
  const [ticketId, setTicketId] = useState(0);

  useEffect(() => {
    const storedTicket = parseInt(localStorage.getItem('ticketId'));
    if (!isNaN(storedTicket)) {
      setTicketId(storedTicket);
    }
  }, []);

  const handleFileChange = (e) => {
    setTicketData({ ...ticketData, files: e.target.files });
  };

  const handleCounter = () => {
    const updatedTicketId = ticketId + 1;
    setTicketId(updatedTicketId);
    localStorage.setItem('ticketId', updatedTicketId.toString());
  };


  return (
    <div>
      {user && user.role === 'end-user' && (
        <>
          <Row className='justify-content-center'>
            <Col md="1">
              <FaUsers size={100} />
            </Col>
            <Col md="11">

              <h1>Hello {user.role}</h1>
              <p>{user.email}</p>
            </Col>

            <Container fluid>
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="CreateTickets" title="All Tickets">
                  <CreateTicket ticketId={ticketId} handleCounter={handleCounter} />
                </Tab>
                <Tab eventKey="userTickets" title="My tickets">
                  <EndUserTicketList ticketId={ticketId} />
                </Tab>
                <Tab eventKey="openTickets" title="Pending">
                  <OpenTickets />
                </Tab>
              </Tabs>

            </Container>

          </Row>


        </>
        // <h1>Welcome {user.role}</h1>

        // <div>


        //   <h2>Create Ticket</h2>
        //   <form onSubmit={handleSubmit}>
        //     <div>
        //       <label>Title:</label>
        //       <input type="text" value={ticketData.title} onChange={(e) => setTicketData({ ...ticketData, title: e.target.value })} />
        //     </div>
        //     <div>
        //       <label>Description:</label>
        //       <textarea value={ticketData.description} onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}></textarea>
        //     </div>
        //     <div>
        //       <label>Attachment:</label>
        //       {/* <input type="file" multiple onChange={handleFileChange} /> */}
        //     </div>
        //     <button type="submit">Submit</button>
        //   </form>
        // </div>
      )}
    </div>
  );
};

export default EndUserComponent;
