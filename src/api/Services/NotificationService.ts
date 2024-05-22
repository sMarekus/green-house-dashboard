import { setNotification, getNotifications } from '../notifications';

export const NotificationService = {
    setHeatingNotification: async (threshold: number) => {
        try {
            const response = await setNotification(threshold, 'Temperature', 'Heating threshold exceeded');
            return response;
        } catch (error) {
            throw new Error('Failed to set heating notification in NotificationService');
        }
    },

    setLightingNotification: async (threshold: number) => {
        try {
            const response = await setNotification(threshold, 'Light', 'Lighting threshold exceeded');
            return response;
        } catch (error) {
            throw new Error('Failed to set lighting notification in NotificationService');
        }
    },

    setHumidityNotification: async (threshold: number) => {
        try {
            const response = await setNotification(threshold, 'Humidity', 'Humidity threshold exceeded');
            return response;
        } catch (error) {
            throw new Error('Failed to set humidity notification in NotificationService');
        }
    },

    getNotifications: async () => {
        return await getNotifications();
    }
};
