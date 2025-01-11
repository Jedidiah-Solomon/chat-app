import Joi from "joi";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function containsSequence(password) {
  const lowerPassword = password.toLowerCase();

  for (let i = 0; i < lowerPassword.length - 2; i++) {
    if (
      !isNaN(lowerPassword[i]) &&
      parseInt(lowerPassword[i]) + 1 === parseInt(lowerPassword[i + 1]) &&
      parseInt(lowerPassword[i]) + 2 === parseInt(lowerPassword[i + 2])
    ) {
      return true;
    }
  }

  for (let i = 0; i < lowerPassword.length - 2; i++) {
    if (
      lowerPassword.charCodeAt(i) + 1 === lowerPassword.charCodeAt(i + 1) &&
      lowerPassword.charCodeAt(i) + 2 === lowerPassword.charCodeAt(i + 2)
    ) {
      return true;
    }
  }

  return false;
}

const signupSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 3 characters long",
    "string.max": "Full name cannot exceed 50 characters",
  }),
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.empty": "Username is required",
    "string.alphanum": "Username must contain only alphanumeric characters",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username cannot exceed 30 characters",
  }),
  password: Joi.string()
    .custom((value, helpers) => {
      if (!passwordRegex.test(value)) {
        return helpers.message(
          "Password must include uppercase, lowercase, a number, and a special character"
        );
      }

      if (containsSequence(value)) {
        return helpers.message(
          "Password cannot contain sequences like '1234' or 'abcd'"
        );
      }

      return value;
    })
    .required()
    .messages({
      "string.empty": "Password is required",
    }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords must match",
    "any.required": "Confirm password is required",
  }),
  gender: Joi.string().valid("male", "female").required().messages({
    "any.only": "Gender must be either 'male' or 'female'",
    "string.empty": "Gender is required",
  }),
});

export const validateSignup = (data) =>
  signupSchema.validate(data, { abortEarly: false });

//--//
// email: Joi.string()
//     .email({ tlds: { allow: false } })
//     .required()
//     .messages({
//       "string.empty": "Email is required",
//       "string.email": "Email must be a valid email address",
//     }),

// use .required() or .optional()
