const validateParams = (query) => {
  const sortPossible = ['helpfulness', 'newest', 'relevence'];

  if (!query.product_id || isNaN(query.product_id)) {
    return {
      status: 422,
      text: 'Error: invalid product_id provided',
    };
  }
  if (query.count && isNaN(query.count)) {
    return {
      status: 422,
      text: 'Error: invalid count provided',
    };
  }
  if (query.sort && !sortPossible.includes(query.sort)) {
    return {
      status: 422,
      text: 'Error: invalid sort provided',
    };
  }
  if (query.page && (isNaN(query.page) || query.page < 0)) {
    return {
      status: 422,
      text: 'Error: invalid page provided',
    };
  }
  return { status: 200 };
};

module.exports = validateParams;