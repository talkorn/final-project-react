import validation from "./validation";
import Joi from "joi";

const editCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),

  description: Joi.string().min(2).max(1024).required(),
  price: Joi.number().min(1).max(99999999).required(),
  category: Joi.string().min(1).max(256).required(),

  image: Joi.object({
    url: Joi.string().regex(
      new RegExp(
        /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/
      )
    ),
    alt: Joi.string().min(2).max(256).required(),
  }),

  //bizNumber: Joi.number().min(1000000).max(9999999).allow(""),
  user_id: Joi.string().hex().length(24),
});
/* Joi.object({
  title: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  price: Joi.number().min(1).max(10).required(),
  createdAt: Joi.string().min(1).max(256).allow(""),
  image: Joi.object().keys({
    url: Joi.string().regex(
      new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      )
    ),
    alt: Joi.string().min(2).max(256).required(),
  }),
}) */ const validateEditCardSchema = (userInput) =>
  validation(editCardSchema, userInput);
export default validateEditCardSchema;
