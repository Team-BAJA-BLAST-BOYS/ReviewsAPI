const errorObj = (param) => ({
  status: 400,
  text: `Error: invalid ${param} provided`,
});

const validateParams = (query) => {
  const sortPossible = ['helpfulness', 'newest', 'relevance'];

  if (!query.product_id || Number.isNaN(Number(query.product_id))) {
    return errorObj('product_id');
  }
  if (query.count && Number.isNaN(Number(query.count))) {
    return errorObj('count');
  }
  if (query.sort && !sortPossible.includes(query.sort)) {
    return errorObj('sort');
  }
  if (query.page && (Number.isNaN(Number(query.page)) || query.page <= 0)) {
    return errorObj('page');
  }
  return { status: 200 };
};

module.exports = validateParams;
