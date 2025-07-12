import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { CreateUserDto, UpdateUserDto } from "../types/user";

const prisma = new PrismaClient();

export const getUsers = async () => prisma.user.findMany();

export const getUser = async (id: string) => prisma.user.findUnique({ where: { id } });

export const createUser = async (data: CreateUserDto) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

export const updateUser = async (id: string, data: UpdateUserDto) =>
  prisma.user.update({ where: { id }, data });

export const removeUser = async (id: string) =>
  prisma.user.delete({ where: { id } });
