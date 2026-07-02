const parseSort = (sort = 'newest') => {
  const mapping = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    name_asc: { name: 1 },
    name_desc: { name: -1 },
  };

  return mapping[sort] || mapping.newest;
};

const buildOffsetPagination = ({ page = 1, limit = 20 } = {}) => {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 100);

  return {
    page: safePage,
    limit: safeLimit,
    skip: (safePage - 1) * safeLimit,
  };
};

const buildCursorPagination = ({ cursor, limit = 20, field = '_id' } = {}) => {
  const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 100);

  const query = {};
  if (cursor) {
    query[field] = { $gt: cursor };
  }

  return {
    query,
    limit: safeLimit,
  };
};

module.exports = {
  parseSort,
  buildOffsetPagination,
  buildCursorPagination,
};
