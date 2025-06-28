import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  majorId: Joi.string().required(), // ajuste conforme seu schema
});

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  majorId: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  majorId?: string;
}
