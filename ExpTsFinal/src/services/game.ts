// src/services/game.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createGameSession(userId: string, score: number, majorId: string) {
  return prisma.gameSession.create({
    data: {
      userId,
      score,
      majorId
    }
  });
}