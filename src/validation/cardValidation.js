import validation from "./validation";
import Joi from "joi";

const editCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  price: Joi.number().min(1).max(99999999).required(),
  stock: Joi.number().min(0).max(99999999).required(),
  category: Joi.string().min(1).max(256).required(),
  colors: Joi.string().min(1).max(256).required(),

  image: Joi.object({
    url: Joi.string()
      .allow("")
      .regex(
        new RegExp(
          /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/
        )
      ),
    alt: Joi.string().min(2).allow("").max(256).allow(),
  }),
  user_id: Joi.string().hex().length(24),
});
const validateEditCardSchema = (userInput) =>
  validation(editCardSchema, userInput);
export default validateEditCardSchema;
