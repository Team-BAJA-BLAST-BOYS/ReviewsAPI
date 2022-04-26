const validateReviewId = (review_id) => {
  if (!review_id || Number.isNaN(Number(review_id))) {
    return {
      status: 400,
      text: 'Error: invalid review_id provided',
    };
  }
  return { status: 200 };
};

module.exports = validateReviewId;
