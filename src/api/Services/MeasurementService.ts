import { getMeasurements, getLatestMeasurements } from '../../api/measurements';

export const MeasurementService = {
  getMeasurements: async () => {
    return await getMeasurements();
  },
  getLatestLightingMeasurement: async () => {
    return await getLatestMeasurements('Light');
  },
  getLatestTemperatureMeasurement: async () => {
    return await getLatestMeasurements('Temperature');
  },
  getLatestHumidityMeasurement: async () => {
    return await getLatestMeasurements('Humidity');
  }
};
