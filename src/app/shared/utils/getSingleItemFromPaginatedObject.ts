import { PaginatedData } from '../shared.interfaces';

const getSingleItemFromPaginatedObject = <T extends { id: string }>(data: PaginatedData<T[]>, id: string): T | undefined => {
  return id && data ? data.items.find((item) => item.id.toLowerCase() === id.toLowerCase()) : undefined;
};

export default getSingleItemFromPaginatedObject;
