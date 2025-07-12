import { Router } from 'express';
import mainController from '../controllers/main';
import majorController from '../controllers/major';
import * as gameController from "../controllers/game";
import * as userController from "../controllers/user";
import { isAuthenticated } from "../middlewares/auth";
import * as authController from "../controllers/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Estende o tipo da sessão
declare module 'express-session' {
  interface SessionData {
    user: { id: string; name: string; email: string; majorId: string };
  }
}

// -----------------------------
// 🌐 Main
// -----------------------------
router.get("/about", mainController.about);
router.get("/hb1", mainController.hb1);
router.get("/hb2", mainController.hb2);
router.get("/hb3", mainController.hb3);
router.get("/hb4", mainController.hb4);
router.get("/create-cookie", mainController.createCookie);
router.get("/uuid", mainController.uuid);
router.get("/lorem/:qtd", mainController.lorem);

// -----------------------------
// 🔐 Login / Logout
// -----------------------------
router.get("/login", authController.login);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// -----------------------------
// 🎮 Game (protegido)
// -----------------------------
router.get("/", isAuthenticated, (req, res) => {
  res.render("game/index", { user: req.session.user });
});

router.post("/game/score", isAuthenticated, async (req, res) => {
  const { score } = req.body;
  const user = req.session.user;

  if (!user || isNaN(score)) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  await prisma.gameSession.create({
    data: {
      userId: user.id,
      score: parseInt(score),
      majorId: user.majorId,
      endedAt: new Date(),
    },
  });

  res.json({ ok: true });
});

router.get("/scores", isAuthenticated, async (req, res) => {
  const sessions = await prisma.gameSession.findMany({
    where: { userId: req.session.user!.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  res.render("game/scores", { sessions });
});

router.get("/ranking", async (req, res) => {
  const ranking = await prisma.gameSession.groupBy({
    by: ["userId"],
    _max: { score: true },
    orderBy: { _max: { score: "desc" } },
    take: 10,
  });

  const users = await prisma.user.findMany({
    where: { id: { in: ranking.map((r) => r.userId) } },
    select: { id: true, name: true },
  });

  const rankingWithNames = ranking.map((r) => {
    const user = users.find((u) => u.id === r.userId);
    return {
      name: user?.name ?? "Desconhecido",
      score: r._max.score ?? 0,
    };
  });

  res.render("game/ranking", { ranking: rankingWithNames });
});

// -----------------------------
// 🎓 Major (CRUD - protegido)
// -----------------------------
router.get("/major", isAuthenticated, majorController.index);
router.get("/major/read/:id", isAuthenticated, majorController.read);
router.get('/major/create', majorController.create);
router.post('/major/create', majorController.create);   // sem isAuthenticated

router.get("/major/update/:id", isAuthenticated, majorController.update);
router.post("/major/update/:id", isAuthenticated, majorController.update);
router.get("/major/remove/:id", isAuthenticated, majorController.remove);
router.post("/major/delete/:id", isAuthenticated, majorController.delete);


// ...importações...

router.get("/user/change-password", isAuthenticated, userController.showChangePassword);
router.post("/user/change-password", isAuthenticated, userController.changePassword);

// -----------------------------
// 👤 User (CRUD - protegido)
// -----------------------------
router.get("/user", isAuthenticated, userController.index);
router.get("/user/create", userController.create);
router.post("/user/create", userController.create);
router.get("/user/read/:id", isAuthenticated, userController.read);
router.get("/user/update/:id", isAuthenticated, userController.update);
router.post("/user/update/:id", isAuthenticated, userController.update);
router.get("/user/remove/:id", isAuthenticated, userController.remove);
router.post("/user/delete/:id", isAuthenticated, userController.deleteUser);

export default router;
