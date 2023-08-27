import validation from "./validation";
import Joi from "joi";

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  message: Joi.string().min(2).max(1000).required(),
});
const contactValidationSchema = (userInput) =>
  validation(contactSchema, userInput);
export default contactValidationSchema;
