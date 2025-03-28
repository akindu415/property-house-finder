import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api'; // Updated to match backend port

export const api = {
  // Get all properties
  getAllProperties: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/properties`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a single property
  getProperty: async (id: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/properties/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add more API methods as needed
  // Example:
  // getAllProperties: async () => {
  //   const response = await axios.get(`${API_BASE_URL}/properties`);
  //   return response.data;
  // },
}; 