import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

/**
 * Middleware de logging que salva em arquivo e mostra no console.
 * O caminho do arquivo é controlado pela variável de ambiente LOGS_PATH.
 * 
 * @param type "combined" (completo, com mais detalhes) ou "short" (básico)
 */
function logger(type: "combined" | "short" = "combined") {
    return (req: Request, res: Response, next: NextFunction) => {
        const logPath = process.env.LOGS_PATH || "./logs/app.log";
        const now = new Date().toISOString();
        let logLine: string;

        if (type === "combined") {
            logLine = `${now} ${req.ip} ${req.method} ${req.url} ${req.httpVersion} ${res.statusCode} "${req.headers['user-agent'] || ''}"\n`;
        } else {
            logLine = `${now} ${req.method} ${req.url}\n`;
        }

        // Cria a pasta se não existir
        fs.mkdirSync(path.dirname(logPath), { recursive: true });

        // Escreve o log no arquivo
        fs.appendFileSync(logPath, logLine);

        // Também mostra no console para debug
        process.stdout.write(logLine);

        next();
    };
}

export default logger;
