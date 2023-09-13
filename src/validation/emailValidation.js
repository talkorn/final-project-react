import validation from "./validation";
import Joi from "joi";

const emailSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});
const emailValidationSchema = (userInput) => validation(emailSchema, userInput);
export default emailValidationSchema;
