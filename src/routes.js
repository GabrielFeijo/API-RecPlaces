const express = require('express');
const router = express.Router();

// Definindo todas as rotas do sistema
const authController = require('./auth/authController');

router.post('/auth', authController.genAccess);
router.get('/checkAccess', authController.publicCheckAccess);

const userController = require('./user/userController');

router.get('/user', userController.indexByUser);
router.get('/users', userController.indexAll);
router.post('/createUser', userController.add);
router.put('/updateUser/:id', userController.update);
router.delete('/users/:id', userController.deleteById);

module.exports = router;
