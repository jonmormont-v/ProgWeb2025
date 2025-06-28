import express, { Request, Response } from "express";
import dotenv from "dotenv";
import logger from "./middlewares/logger";
import router from "./router/router";
import { engine } from "express-handlebars";
import cookieParser from 'cookie-parser';
import session from "express-session";
import uuid from "uuid";
import { v4 as uuidv4} from "uuid";

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3888;

app.use(cookieParser());

const genid = (req: Request) => {
  return uuidv4();
};

app.use(
  session({
    genid,
    secret: 'your-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})
);

app.use(logger("combined"));
app.use(express.urlencoded({ extended: false }));
app.use("/img", express.static(`${__dirname}/../public/img`));


app.engine(
  "handlebars",
  engine({
    helpers: require(`${__dirname}/views/helpers/helpers.ts`)
  })
);
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.locals.valor = "10";

app.use(router);

app.get("/google", (req: Request, res: Response) => {
  res.redirect("http://google.com");
}); 

app.get("/bemvindo/:nome", (req: Request, res: Response) => {
  res.send(`Seja bem-vindo(a) ${req.params.nome}.`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("oii");
});

app.get("/about", (req: Request, res: Response) => {
  res.send("Página about");
});

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
