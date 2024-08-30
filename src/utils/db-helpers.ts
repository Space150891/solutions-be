import { FindOptionsOrder } from 'typeorm';

export const sortBuild = (sortBy: {
  [x: string]: 'ASC' | 'DESC';
}): FindOptionsOrder<any> => {
  const sortEntries = Object.entries(sortBy || {});
  const [sortKey, sortVal] = sortEntries.length
    ? sortEntries[0]
    : ['createdAt', 'DESC'];
  const order = { [sortKey || 'createdAt']: sortVal || 'DESC' };
  return order;
};

export const paginationBuild = (pagination: {
  page: number;
  limit: number;
}): { skip: number; take: number } => {
  const { page, limit } = pagination;
  const pageClean = page ? Number(page) : 1;
  const limitClean = limit ? Number(limit) : 10;
  return {
    skip: (pageClean - 1) * limitClean,
    take: limitClean,
  };
};
