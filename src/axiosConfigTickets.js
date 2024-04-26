import axios from 'axios';

// Set the base URL for Axios to point to your JSON Server
axios.defaults.baseURL = 'http://localhost:3000';

// Fetch all tickets
const fetchTickets = async () => {
    try {
        const response = await axios.get('http://localhost:3000/tickets');
        console.log("tickets", response.data);
        return response.data; // Return the fetched tickets
    } catch (error) {
        console.error('Fetch tickets error:', error);
        throw error; // Throw the error for handling in the calling component
    }
};

// Create a new ticket
const createTicket = async (ticketData) => {
    try {
        const response = await axios.post('http://localhost:3000/tickets', ticketData);
        return response.data; // Return the created ticket
    } catch (error) {
        console.error('Create ticket error:', error);
        throw error; // Throw the error for handling in the calling component
    }
};

// Get ticket by ID
const getTicketById = async (ticketId) => {
    try {
        const response = await axios.get(`/tickets/${ticketId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getTicketByid = async (ticketId) => {
    try {
        const response = await axios.get(`/tickets/${ticketId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// // Update an existing ticket
// const updateTicket = async (ticketId, updatedTicketData) => {
//     try {
//         const response = await axios.put(`/tickets/${ticketId}`, updatedTicketData);
//         return response.data; // Return the updated ticket
//     } catch (error) {
//         console.error('Update ticket error:', error);
//         throw error; // Throw the error for handling in the calling component
//     }
// };

const updateTicket = async (id, updatedTicketData) => {
    try {
        const response = await axios.patch(`http://localhost:3000/tickets/${id}`, updatedTicketData);
        return response.data; // Return the updated ticket
    } catch (error) {
        console.error(error)
        // console.error(`${status} ticket error:`, error);
        throw error;
    }
}

// Close ticket by ID
const closeTicketById = async (id) => {
    try {
        const response = await axios.put(`http://localhost:3000/tickets/${id}/close`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Resolve ticket by ID
const resolveTicketById = async (id) => {
    try {
        const response = await axios.put(`http://localhost:3000/tickets/${id}/resolve`);
        return response.data;
    } catch (error) {
        throw error;
    }
};



// Delete a ticket
const deleteTicket = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/tickets/${id}`);
        return response.data; // Return the response data (usually empty for DELETE requests)
    } catch (error) {
        console.error('Delete ticket error:', error);
        throw error; // Throw the error for handling in the calling component
    }
};

export { fetchTickets, createTicket, updateTicket, deleteTicket, getTicketById, closeTicketById, resolveTicketById };