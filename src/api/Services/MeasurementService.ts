import { getMeasurements, getLatestMeasurements } from '../../api/measurements';

export const MeasurementService = {
  getMeasurements: async () => {
    return await getMeasurements();
  },
  getLatestLightingMeasurement: async () => {
    const response = await getLatestMeasurements('Lighting');
    return response.value;
  },
  getLatestTemperatureMeasurement: async () => {
    const response = await getLatestMeasurements('Temperature');
    return response.value;
  },
  getLatestHumidityMeasurement: async () => {
    const response = await getLatestMeasurements('Humidity');
    return response.value;
  }
};
