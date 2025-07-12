import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const showRanking = async (req: Request, res: Response) => {
  const ranking = await prisma.gameSession.findMany({
    select: {
      score: true,
      user: {
        select: {
          name: true,
        }
      }
    },
    orderBy: { score: "desc" },
    take: 10,
  });

  // Renomeando para facilitar no template
  const formatted = ranking.map((item) => ({
    name: item.user.name,
    score: item.score,
  }));

  // Aqui está o ajuste!
  res.render("game/ranking", { ranking: formatted, user: req.session.user });
};
