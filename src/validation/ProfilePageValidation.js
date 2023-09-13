import validation from "./validation";
import Joi from "joi";

const profileSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(256).required(),
    middle: Joi.string().min(2).max(256).allow(""),
    last: Joi.string().min(2).max(256).required(),
  }),
  resetToken: Joi.string().min(2),
  resetTokenExpiration: Joi.date(),
  phone: Joi.string().min(9).max(14).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  imageFile: Joi.string().min(1).max(255),
  image: Joi.object().keys({
    url: Joi.string().regex(
      new RegExp(
        /(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/
      )
    ),
    alt: Joi.string().min(2).max(256).required(),
    file: Joi.object().min(0).max(255),
  }),
  address: Joi.object()
    .required()
    .keys({
      state: Joi.string().allow("").min(1).max(256),
      country: Joi.string().min(2).max(256).required(),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      houseNumber: Joi.number().min(1).required(),
      zip: Joi.number().allow("", 0),
    }),
  isAdmin: Joi.boolean().allow(""),
  isBusiness: Joi.boolean().required(),
});
const validateProfileSchema = (userInput) =>
  validation(profileSchema, userInput);
export default validateProfileSchema;
