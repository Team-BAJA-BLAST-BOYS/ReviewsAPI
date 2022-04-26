const errorObj = (param) => ({
  status: 400,
  text: `Error: invalid ${param} provided`,
});

const validateEmail = (email) => {
  const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
  return regex.test(email);
};

const checkObj = (obj) => obj.toString() === '[object Object]';

const checkCharacteristicEntries = (characteristics) => {
  let check = true;
  Object.entries(characteristics).forEach((characteristic) => {
    if (Number.isNaN(Number(characteristic[0]))) {
      check = false;
    }
    if (typeof characteristic[1] !== 'number'
    || (characteristic[1] < 1 || characteristic[1] > 5)) {
      check = false;
    }
  });

  if (!check) {
    return false;
  }
  return true;
};

const validatePostBody = (body) => {
  if (!body.product_id || typeof body.product_id !== 'number') {
    return errorObj('product_id');
  }
  if (!body.rating || Number.isNaN(Number(body.rating))
  || (body.rating < 1 || body.rating > 5)) {
    return errorObj('rating');
  }
  if (!body.summary || body.summary.length > 60 || typeof body.summary !== 'string') {
    return errorObj('summary');
  }
  if (!body.body || body.body.length < 50 || body.body.length > 1000 || typeof body.summary !== 'string') {
    return errorObj('body');
  }
  if (!body.name || typeof body.name !== 'string') {
    return errorObj('name');
  }
  if (!body.email || !validateEmail(body.email)) {
    return errorObj('email');
  }
  if (!body.photos || !Array.isArray(body.photos)) {
    return errorObj('photos');
  }
  if (!body.photos.every((entry) => (typeof entry === 'string'))) {
    return errorObj('photos');
  }
  if (!body.characteristics
    || !checkObj(body.characteristics)
    || !checkCharacteristicEntries(body.characteristics)) {
    return errorObj('characteristics');
  }
  return { status: 201 };
};

module.exports = {
  email: validateEmail,
  obj: checkObj,
  chara: checkCharacteristicEntries,
  postBody: validatePostBody,
};
