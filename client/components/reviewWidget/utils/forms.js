const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validateEmail = (email) => {
  if (email.match(emailRegex)) {
    return true;
  } else {
    return false;
  }
};

const validateMaxLength = (input, maxLength) => {
  return input.length <= maxLength;
};

const validateMinLength = (input, minLength) => {
  return input.length >= minLength;
};

const validateNotEmpty = (input) => {
  if (input === undefined || input === null) {
    return false;
  }
  if (typeof input !== 'string') {
    input = input.toString();
  }
  return input.length > 0;
};

module.exports = {
  validateEmail,
  validateNotEmpty,
  validateMaxLength,
  validateMinLength,
};
