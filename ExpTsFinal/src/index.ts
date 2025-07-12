import express, { Request, Response } from "express";
import dotenv from "dotenv";
import logger from "./middlewares/logger";
import router from "./router/router";
import path from "path";
import { engine } from "express-handlebars";
import cookieParser from 'cookie-parser';
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import { validateEnv } from './utils/validateEnv';
import bodyParser from "body-parser";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT ?? 4000;

// ==============================
// 🔧 Configuração do Handlebars
// ==============================
app.engine(
  "handlebars",
  engine({
    extname: ".handlebars",
    helpers: {
      inc: (value: number) => value + 1,
      eq: (a: any, b: any) => a == b,
      ifCond: (v1: any, v2: any, options: any) => {
        if (v1 == v2) {
          return options.fn(this);
        }
        return options.inverse(this);
      }
    }
  })
);



app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// ==============================
// 📦 Middlewares
// ==============================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    genid: () => uuidv4(),
    secret: 'your-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);
app.use(logger("combined"));

app.use(express.static("public"));
app.use("/img", express.static(path.join(__dirname, "../public/img")));
app.use("/game", express.static("game"));

// ==============================
// 📂 Rotas principais
// ==============================
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use(router);

// ==============================
// 🧪 Testes de rota simples
// ==============================
app.get("/google", (_req: Request, res: Response) => {
  res.redirect("http://google.com");
}); 

app.get("/bemvindo/:nome", (req: Request, res: Response) => {
  res.send(`Seja bem-vindo(a) ${req.params.nome}.`);
});

app.get("/", (_req: Request, res: Response) => {
  res.send("oii");
});

app.get("/about", (_req: Request, res: Response) => {
  res.send("Página about");
});

// ==============================
// 🚀 Inicialização
// ==============================
app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
