import { cleanEnv, str, port } from 'envalid';

export function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    DATABASE_URL: str(),
    // Adicione outras variáveis obrigatórias conforme seu .env
  });
}
