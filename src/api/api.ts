import axios from 'axios';

const API_URL = 'http://localhost:7128';

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};
