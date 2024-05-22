import { getStatuses, updateWindowStatus } from '../../api/board';

export const BoardService = {
  getStatuses: async () => {
    return await getStatuses();
  },
  
  updateWindowStatus: async (windowStatus: number, ledStatus: number) => {
    return await updateWindowStatus(windowStatus, ledStatus);
  },
};
