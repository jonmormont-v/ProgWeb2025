// src/services/major.ts
import { PrismaClient, Major } from "@prisma/client";
import { CreateMajorDto, UpdateMajorDto } from "../types/major";

const prisma = new PrismaClient();

export const createMajor = async (newMajor: CreateMajorDto): Promise<Major> => {
  return await prisma.major.create({ data: newMajor });
};

export const getMajors = async (): Promise<Major[]> => {
  return await prisma.major.findMany();
};

export const getMajor = async (id: string): Promise<Major | null> => {
  return await prisma.major.findUnique({ where: { id } });
};

export const majorAlreadyExists = async (name: string): Promise<boolean> => {
  const existingMajor = await prisma.major.findUnique({ where: { name } });
  return existingMajor !== null;
};

export const updateMajor = async (id: string, major: UpdateMajorDto): Promise<Major> => {
  return await prisma.major.update({
    where: { id },
    data: major,
  });
};

export const removeMajor = async (id: string): Promise<string> => {
  const deletedMajor = await prisma.major.delete({
    where: { id },
  });
  return deletedMajor.id;
};
