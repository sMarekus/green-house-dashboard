import axios from 'axios';

const API_URL = 'http://sep4backendapp.azurewebsites.net/api/';

export const setNotification = async (threshold: number, measurementType: string, message: string) => {
    try {
        await axios.post(`${API_URL}/Notification`, { threshold, measurementType, message });
    } catch (error) {
        throw new Error('Failed to set notification');
    }
};
