import Joi from "joi";

import validation from "./validation";
const inventorySchema = Joi.object({
  id: Joi.number().min(1).max(99999999).required(),
});
const validateInventorySchema = (userInput) =>
  validation(inventorySchema, userInput);
export default validateInventorySchema;
