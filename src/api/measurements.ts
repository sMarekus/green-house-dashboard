import axios from 'axios';

const API_URL = 'http://sep4backendapp.azurewebsites.net/api/';

export const getMeasurements = async () => {
  try {
    const response = await axios.get(`${API_URL}/Measurement/all`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch measurements');
  }
};
