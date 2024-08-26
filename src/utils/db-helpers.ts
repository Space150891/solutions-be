export const sortBuild = (sortBy: { [x: string]: 'ASC' | 'DESC' }) => {
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
}) => {
  return {
    skip: (pagination.page - 1) * pagination.limit,
    take: pagination.limit,
  };
};
