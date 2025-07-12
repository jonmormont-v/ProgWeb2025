// src/controllers/auth.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    return res.render("auth/login", { error: null });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("auth/login", { error: "Preencha todos os campos." });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render("auth/login", { error: "Email ou senha incorretos." });
  }

  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    majorId: user.majorId ?? "",
  };

  res.redirect("/");
};


export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};