import { getStatuses, updateStatus } from '../../api/board';

export const BoardService = {
  getStatuses: async () => {
    return await getStatuses();
  },
  
  updateStatus: async (windowStatus: number, ledStatus: number) => {
    return await updateStatus(windowStatus, ledStatus);
  },
};
