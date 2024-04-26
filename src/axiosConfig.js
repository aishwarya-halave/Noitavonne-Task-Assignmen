import axios from 'axios';

// Set the base URL for Axios to point to your JSON Server
axios.defaults.baseURL = 'http://localhost:3001';

// Fetch data
const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:3001/users');

        console.log('Fetched data:',);
        // console.log("single data", response.data[0].name``)
        return response.data;

        // Optionally, handle fetched data (e.g., update state in React component)
    } catch (error) {
        console.error('Fetch error:', error);
        // Optionally, handle error (e.g., display error message)
    }
};

// Create data
const createUser = async (formData) => {
    try {
        const response = await axios.post('http://localhost:3001/users', formData);
        console.log('User created:', response.data);
        alert("user created")
        // Optionally, handle success (e.g., display confirmation message)
    } catch (error) {
        console.error('Create user error:', error);
        // Optionally, handle error (e.g., display error message)
    }
};

// Update data
const updateUser = async (userId, updatedData) => {
    try {
        const response = await axios.put(`/users/${userId}`, updatedData);
        console.log('User updated:', response.data);
        // Optionally, handle success (e.g., display confirmation message)
    } catch (error) {
        console.error('Update user error:', error);
        // Optionally, handle error (e.g., display error message)
    }
};

// Delete data
const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`/users/${userId}`);
        console.log('User deleted:', response.data);
        // Optionally, handle success (e.g., display confirmation message)
    } catch (error) {
        console.error('Delete user error:', error);
        // Optionally, handle error (e.g., display error message)
    }
};

// Fetch all tickets
const fetchTickets = async () => {
    try {
        const response = await axios.get('http://localhost:3000/tickets/tickets');
        console.log("tickets", response.data);
        return response.data; // Return the fetched tickets
    } catch (error) {
        console.error('Fetch tickets error:', error);
        throw error; // Throw the error for handling in the calling component
    }
};

export { fetchData, createUser, updateUser, deleteUser };