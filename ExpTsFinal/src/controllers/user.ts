import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import "express-session";

const prisma = new PrismaClient();

// Lista de usuários
export const index = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.render("user/index", { users });
};

// Criação de usuário (GET e POST)
export const create = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    const majors = await prisma.major.findMany();
    return res.render("user/create", { majors });
  }

  const { name, email, password, majorId } = req.body;

  if (!majorId) {
    const majors = await prisma.major.findMany();
    return res.render("user/create", {
      majors,
      error: "Você deve selecionar um curso.",
    });
  }

  if (password.length < 6) {
    const majors = await prisma.major.findMany();
    return res.render("user/create", {
      majors,
      error: "A senha deve ter no mínimo 6 caracteres.",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUsers = await prisma.user.findMany();
    const isAdmin = existingUsers.length === 0;

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        majorId,
      },
    });

    res.redirect("/user");
  } catch (error: any) {
    console.error("❌ Erro ao criar usuário:", error);

    const majors = await prisma.major.findMany();
    let errorMessage = "Erro ao criar usuário.";

    if (error.code === "P2002") {
      errorMessage = "Este e-mail já está em uso.";
    }

    return res.status(400).render("user/create", {
      majors,
      error: errorMessage,
    });
  }
};


// Visualizar um usuário específico
export const read = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({ where: { id } });
  res.render("user/read", { user });
};

// Atualizar um usuário (GET e POST)
export const update = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (req.method === "GET") {
    const user = await prisma.user.findUnique({ where: { id } });
    const majors = await prisma.major.findMany();
    return res.render("user/update", { user, majors });
  }

  const { name, email, majorId } = req.body;

  await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      majorId,
    },
  });

  res.redirect("/user");
};

// Confirmar remoção
export const remove = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({ where: { id } });
  res.render("user/delete", { user });
};

// Deletar de fato
export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  await prisma.user.delete({ where: { id } });
  res.redirect("/user");
};

// Exibir tela de alteração de senha
export async function showChangePassword(req: Request, res: Response) {
  res.render("user/change-password", { user: req.session.user });
}

// Troca de senha (POST)
export async function changePassword(req: Request, res: Response) {
  const { currentPassword, newPassword, repeatNewPassword } = req.body;
  const userId = req.session.user?.id;

  if (!userId) return res.redirect("/login");

  if (!currentPassword || !newPassword || !repeatNewPassword) {
    return res.render("user/change-password", {
      error: "Preencha todos os campos!",
      user: req.session.user,
    });
  }
  
  if (newPassword.length < 6) {
  return res.render("user/change-password", {
    error: "A nova senha deve ter pelo menos 6 caracteres!",
    user: req.session.user,
  });
}

  if (newPassword !== repeatNewPassword) {
    return res.render("user/change-password", {
      error: "Nova senha e repetição não conferem!",
      user: req.session.user,
    });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return res.render("user/change-password", {
      error: "Usuário não encontrado!",
      user: req.session.user,
    });
  }

  const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  if (!passwordMatch) {
    return res.render("user/change-password", {
      error: "Senha atual incorreta!",
      user: req.session.user,
    });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: userId }, data: { password: hashed } });

  res.render("user/change-password", {
    success: "Senha alterada com sucesso!",
    user: req.session.user,
  });
}
