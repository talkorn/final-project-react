import validation from "./validation";
import Joi from "joi";

const signUpSchema = Joi.object({
  firstName: Joi.string().min(2).max(255).required(),
  middleName: Joi.string().min(2).max(255).allow(""),
  lastName: Joi.string().min(2).max(255).required(),
  phone: Joi.string().min(9).max(14).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  resetToken: Joi.string().min(2),
  resetTokenExpiration: Joi.date(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z]).{0,}$"))
    .min(6)
    .max(10)
    .required(),
  imageUrl: Joi.string().min(6).max(1024).allow(""),
  imageAlt: Joi.string().min(6).max(256).allow(""),
  state: Joi.string().min(2).max(256).allow(""),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.number().min(0).max(99999999999).required(),
  zipCode: Joi.number().min(0).max(99999999999).allow(""),
  isBusiness: Joi.boolean(),
});
const validateSignUpSchema = (userInput) => validation(signUpSchema, userInput);
export default validateSignUpSchema;
