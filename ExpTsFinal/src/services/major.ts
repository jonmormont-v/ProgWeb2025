import { PrismaClient, Major, Prisma } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// Tipos atualizados para compatibilidade com Prisma
type CreateMajorDto = Prisma.MajorCreateInput;
type UpdateMajorDto = Prisma.MajorUpdateInput;

export const createMajor = async (newMajor: Omit<CreateMajorDto, 'id' | 'createdAt' | 'updatedAt'>): Promise<Major> => {
  return await prisma.major.create({
    data: {
      id: uuidv4(),
      ...newMajor,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  });
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
    data: {
      ...major,
      updatedAt: new Date(),
    }
  });
};

export const removeMajor = async (id: string): Promise<string> => {
  const deletedMajor = await prisma.major.delete({
    where: { id },
  });
  return deletedMajor.id;
};