import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  createMajor,
  getMajors,
  getMajor,
  updateMajor,
  removeMajor,
} from '../services/major';
import Joi from 'joi';

const majorSchema = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().min(1).max(4).required(),  // De 1 a 4 caracteres
  description: Joi.string().allow('', null),
});

/*---------------------------  LISTAGEM  ---------------------------*/
export const index = async (req: Request, res: Response) => {
  try {
    const majors = await getMajors();
    res.render('major/index', { majors, layout: 'main' });
  } catch (err: any) {
    console.error(err);
    res.status(500).render('error', { 
      error: "Erro ao listar cursos",
      message: err.message 
    });
  }
};

// ... (código anterior)

/*---------------------------  CREATE  -----------------------------*/
export const create = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    return res.render('major/create', { 
      layout: 'main',
      error: null,
      formData: {} 
    });
  }

  /* Validação */
  const { error, value } = majorSchema.validate(req.body);
  if (error) {
    return res.render('major/create', {
      layout: 'main',
      error: `Dados inválidos: ${error.message}`,
      formData: req.body
    });
  }

  try {
    const data = {
      ...value,
      description: value.description?.trim() === '' ? null : value.description,
    };

    await createMajor(data);
    res.redirect('/major');
  } catch (err: any) {
    console.error("Erro detalhado:", err);
    
    let userMessage = "Erro ao criar curso";
    if (err.message.includes("Unique constraint")) {
      if (err.message.includes("name")) userMessage = "Nome do curso já existe";
      if (err.message.includes("code")) userMessage = "Código do curso já existe";
    }

    res.render('major/create', {
      layout: 'main',
      error: userMessage,
      formData: req.body
    });
  }
};

/*---------------------------  READ  -------------------------------*/
export const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const major = await getMajor(id);
    if (!major) {
      return res.status(404).send(`Curso não encontrado: ID ${id} não existe`);
    }
    res.render('major/read', { major, layout: 'main' });
  } catch (err: any) {
    console.error(err);
    res.status(500).send(`Erro ao carregar curso: ${err.message}`);
  }
};

// ... (repetir o mesmo padrão para outras ações)

/*---------------------------  UPDATE  -----------------------------*/
export const update = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (req.method === 'GET') {
    try {
      const major = await getMajor(id);
      if (!major) return res.status(404).send('Não encontrado');
      return res.render('major/update', { major, layout: 'main' });
    } catch (err: any) {
      console.error(err);
      return res.status(500).render('error', {
        error: "Erro ao carregar edição",
        message: err.message
      });
    }
  }

  const { error, value } = majorSchema.validate(req.body);
  if (error) {
    return res.status(400).render('error', {
      error: "Dados inválidos",
      message: error.message
    });
  }

  try {
    const updateData = {
      ...value,
      description: value.description?.trim() === '' ? null : value.description,
    };

    await updateMajor(id, updateData);
    res.redirect('/major');
  } catch (err: any) {
    console.error(err);
    
    let userMessage = "Erro ao atualizar curso";
    if (err.message.includes("Unique constraint")) {
      if (err.message.includes("name")) userMessage = "Nome do curso já existe";
      if (err.message.includes("code")) userMessage = "Código do curso já existe";
    }

    res.status(500).render('error', {
      error: userMessage,
      details: err.message
    });
  }
};

/*---------------------------  DELETE  -----------------------------*/
export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await removeMajor(id);
    res.redirect('/major');
  } catch (err: any) {
    console.error(err);
    res.status(500).render('error', {
      error: "Erro ao excluir curso",
      message: err.message
    });
  }
};

// Para exclusão via AJAX
export const del = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await removeMajor(id);
    res.sendStatus(200);
  } catch (err: any) {
    console.error("Erro ao deletar major via Ajax:", err);
    res.status(500).json({ error: err.message });
  }
};

export default { 
  index, 
  create, 
  read, 
  update, 
  remove, 
  delete: del 
};