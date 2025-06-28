import { Request, Response } from 'express';

const signup = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    res.render("auth/signup", { layout: "main" });
  } else {
    res.send("dados recebidos (signup)");
  }
};

const login = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    res.render("auth/login", { layout: "main" });
  } else {
    res.send("Login POST endpoint");
  }
};

const logout = async (req: Request, res: Response) => {
  res.send("Logout endpoint");
};

export default { signup, login, logout };
