import Joi from 'joi';

// Validação para criação de usuário
export const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  majorId: Joi.string().required()
});

// Validação opcional para atualização
export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  majorId: Joi.string().optional()
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
