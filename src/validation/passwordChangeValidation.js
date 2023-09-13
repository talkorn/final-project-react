import validation from "./validation";
import Joi from "joi";

const passwordChangeSchema = Joi.object({
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z]).{0,}$"))
    .min(6)
    .max(10)
    .required(),
});
const passwordValidationSchema = (userInput) =>
  validation(passwordChangeSchema, userInput);
export default passwordValidationSchema;
