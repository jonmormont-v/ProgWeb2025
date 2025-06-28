// src/routes/loremRoutes.ts
import { Router, Request, Response } from 'express';
import { generateLoremIpsum } from '../utils/loremIpsumGenerator';

const router = Router();

// Define a rota /lorem
router.get('/lorem', (req: Request, res: Response) => {
  // Obtém o número de parágrafos a partir dos parâmetros da consulta
  const numParagraphs = parseInt(req.query.paragraphs as string, 10);

  if (isNaN(numParagraphs) || numParagraphs <= 0) {
    return res.status(400).send('O número de parágrafos deve ser um número positivo.');
  }

  // Gera o texto Lorem Ipsum
  const loremText = generateLoremIpsum(numParagraphs);

  // Envia o texto Lorem Ipsum como resposta
  res.send(loremText);
});

export default router;