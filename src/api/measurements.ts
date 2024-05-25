import axios from 'axios';

const API_URL = 'https://sep4backendapp.azurewebsites.net/api/';

export const getMeasurements = async () => {
  try {
    const response = await axios.get(`${API_URL}/Measurement/all`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch measurements');
  }
};

export const getLatestMeasurements = async (type: string) => {
  try {
    const response = await axios.get(`${API_URL}/Measurement/latest+measurement?type=${type}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get latest measurement');
  }
};
