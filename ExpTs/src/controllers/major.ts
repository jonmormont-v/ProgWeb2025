import { Request, Response } from 'express';
import { createMajor, getMajors, getMajor, updateMajor, removeMajor } from '../services/major';
import Joi from 'joi';

const majorSchema = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
  description: Joi.string().allow('', null)
});

const index = async (req: Request, res: Response) => {
  try {
    const majors = await getMajors();
    res.render('major/index', { majors, layout: 'main' });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const create = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    res.render('major/create', { layout: 'main' });
  } else {
    const { error, value } = majorSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);
    try {
      await createMajor(value);
      res.redirect('/major');
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
};

const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const major = await getMajor(id);
    if (!major) return res.status(404).send('Não encontrado');
    res.render('major/read', { major, layout: 'main' });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (req.method === 'GET') {
    try {
      const major = await getMajor(id);
      if (!major) return res.status(404).send('Não encontrado');
      res.render('major/update', { major, layout: 'main' });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  } else {
    const { error, value } = majorSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);
    try {
      await updateMajor(id, value);
      res.redirect('/major');
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await removeMajor(id);
    res.redirect('/major');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export default { index, create, read, update, remove };
