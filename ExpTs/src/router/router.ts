// src/routes/router.ts
import { Router } from 'express';

import mainController from '../controllers/main';
import majorController from '../controllers/major';
import userController from "../controllers/user";
// import authController from '../controllers/auth'; // Remova se não for usar nesta etapa!

const router = Router();

// Main Controller
router.get('/', mainController.index);
router.get('/about', mainController.about);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);
router.get('/create-cookie', mainController.createCookie); // (opcional)
router.get('/uuid', mainController.uuid); // (opcional)
router.get('/lorem/:qtd', mainController.lorem);


// Major Controller (CRUD)
router.get('/major', majorController.index);
router.get('/major/read/:id', majorController.read);
router.get('/major/create', majorController.create);
router.post('/major/create', majorController.create);
router.get('/major/update/:id', majorController.update);
router.post('/major/update/:id', majorController.update);
// Suporte a remoção via GET e DELETE
router.get('/major/remove/:id', majorController.remove);
router.delete('/major/remove/:id', majorController.remove);

// Auth Controller (só inclua se for obrigatório na etapa!)
// router.get('/auth/signup', authController.signup);
// router.post('/auth/signup', authController.signup);
// router.get('/auth/login', authController.login);
// router.post('/auth/login', authController.login);
// router.post('/auth/logout', authController.logout);


router.get('/user', userController.index);
router.get('/user/create', userController.create);
router.post('/user/create', userController.create);
router.get('/user/read/:id', userController.read);
router.get('/user/update/:id', userController.update);
router.post('/user/update/:id', userController.update);
router.get('/user/remove/:id', userController.remove);


export default router;
