import { getMeasurements } from '../../api/measurements';

export const MeasurementService = {
  getMeasurements: async () => {
    return await getMeasurements();
  },
};
