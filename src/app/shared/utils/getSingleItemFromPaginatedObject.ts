import { PaginatedData } from '../shared.interfaces';

const getSingleItemFromPaginatedObject = <T extends { id: string }>(data: PaginatedData<T[]>, id: string): T | undefined => {
  return data.items.find((item) => item.id === id);
};

export default getSingleItemFromPaginatedObject;
