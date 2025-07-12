import { Request, Response, NextFunction } from "express";

/**
 * Middleware para proteger rotas que exigem autenticação.
 */
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.user) {
    return next(); // usuário autenticado
  } else {
    return res.redirect("/login"); // redireciona para login
  }
}
