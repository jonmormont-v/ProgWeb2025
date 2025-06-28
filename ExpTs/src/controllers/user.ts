import { Request, Response } from "express";
import * as userService from "../services/user";
import * as majorService from "../services/major"; // <---- esta linha resolve!
import { userSchema } from "../types/user";


const index = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.render("user/index", { users });
};

const create = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    const majors = await majorService.getMajors(); // pega todos os majors
    res.render("user/create", { majors });
  } else {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await userService.createUser(req.body);
    res.redirect("/user");
  }
};

const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getUser(id);
  res.render("user/read", { user });
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (req.method === "GET") {
    const user = await userService.getUser(id);
    const majors = await majorService.getMajors();
    res.render("user/update", { user, majors });
  } else {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await userService.updateUser(id, req.body);
    res.redirect("/user");
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  await userService.removeUser(id);
  res.redirect("/user");
};

export default { index, create, read, update, remove };
