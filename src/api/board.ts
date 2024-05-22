import axios from 'axios';

const API_URL = 'http://sep4backendapp.azurewebsites.net/api/Board';

export const getStatuses = async () => {
    try {
      const windowResponse = await axios.get(`${API_URL}/window-status`);
      const ledResponse = await axios.get(`${API_URL}/led-status`);
      return { windowStatus: windowResponse.data, ledStatus: ledResponse.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('Failed to fetch statuses: ' + error.message);
      } else {
        throw new Error('Failed to fetch statuses');
      }
    }
};
  
  export const updateStatus = async (windowStatus: number, ledStatus: number) => {
    try {
      await axios.patch(`${API_URL}/update-status`, { windowStatus, ledStatus });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('Failed to update window status: ' + error.message);
      } else {
        throw new Error('Failed to update window status');
      }
    }
};
