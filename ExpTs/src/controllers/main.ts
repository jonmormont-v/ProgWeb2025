import { Request, Response } from 'express';
import { generateLoremIpsum } from '../utils/loremIpsumGenerator';
import { v4 as uuidv4 } from "uuid";

// Dados de exemplo para hb3 e hb4
const technologies = [
  { name: 'Express', type: 'Framework', poweredByNodejs: true },
  { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
  { name: 'React', type: 'Library', poweredByNodejs: true },
  { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
  { name: 'Django', type: 'Framework', poweredByNodejs: false },
  { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
  { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
];

const profes = [
  { nome: "David Fernandes", sala: 1238 },
  { nome: "Horácio Fernandes", sala: 1233 },
  { nome: "Edleno Moura", sala: 1236 },
  { nome: "Elaine Harada", sala: 1231 }
];

// Página inicial (GET /)
const index = (req: Request, res: Response) => {
  res.send('Welcome to Web academy!');
};

// Página about (GET /about)
const about = (req: Request, res: Response) => {
  res.render("main/about", { layout: "main" });
};

// Handlebars 1 (GET /hb1)
const hb1 = (req: Request, res: Response) => {
  res.render("main/hb1", {
    mensagem: 'Olá, você está aprendendo Express + HBS!',
    layout: "main"
  });
};

// Handlebars 2 (GET /hb2)
const hb2 = (req: Request, res: Response) => {
  res.render("main/hb2", {
    poweredByNodejs: true,
    name: "Express",
    type: "Framework",
    layout: "main"
  });
};

// Handlebars 3 (GET /hb3)
const hb3 = (req: Request, res: Response) => {
  res.render("main/hb3", { profes, layout: "main" });
};

// Handlebars 4 (GET /hb4)
const hb4 = (req: Request, res: Response) => {
  res.render('main/hb4', { technologies, layout: "main" });
};

// Lorem Ipsum (GET /lorem/:qtd)
const lorem = (req: Request, res: Response) => {
  const qtd = parseInt(req.params.qtd, 10);
  if (isNaN(qtd) || qtd <= 0) {
    return res.status(400).send('O número de parágrafos deve ser um número positivo.');
  }
  const loremText = generateLoremIpsum(qtd);
  res.send(loremText);
};

// Criar Cookie (GET /create-cookie)
const createCookie = (req: Request, res: Response) => {
  if (!req.cookies || !req.cookies.nomeCookie) {
    res.cookie('nomeCookie', 'valorCookie');
    res.send('Você NUNCA passou por aqui!');
  } else {
    res.send('Você JÁ passou por aqui');
  }
};

// Gerar UUID (GET /uuid)
const uuid = (req: Request, res: Response) => {
  const uniqueId = uuidv4();
  res.send(`UUID: ${uniqueId}`);
};

export default {
  index,
  about,
  hb1,
  hb2,
  hb3,
  hb4,
  lorem,
  createCookie,
  uuid,
} as {
  [key: string]: (req: Request, res: Response) => any;
};
