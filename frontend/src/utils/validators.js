import { ucFirst } from "./string";

/**
 * Checks if all fields are present
 *
 * @param {Object} form
 *
 * @returns {Boolean} true or false
 */
export const validateRequired = (form) => {
  let valid = true;
  const errors = {};
  for (const [key, value] of Object.entries(form)) {
    if (value === "" || value === null) {
      valid = false;
      errors[key] = `${ucFirst(key)} is required`;
    }
  }

  return { errors, valid };
};

export const checkFormErrors = (formErrors) => {
  let state = {};
  for (const [key, value] of Object.entries(formErrors)) {
    if (value && value != "") {
      state[key] = false;
    }
  }
  return state;
};
