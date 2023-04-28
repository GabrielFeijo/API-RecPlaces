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

const placesController = require('./places/placesController');

router.get('/places/:category', placesController.indexByCategory);
router.get('/places', placesController.indexAll);
router.post('/createPlace', placesController.add);
router.put('/updatePlace/:id', placesController.update);
router.delete('/place/:id', placesController.deleteById);

const descriptionController = require('./description/descriptionController');

router.get('/description/:placeId', descriptionController.indexByPlace);
router.get('/description', descriptionController.indexAll);
router.post('/createDescription', descriptionController.add);
router.put('/updateDescription/:placeId', descriptionController.update);
router.delete('/deleteDescription/:placeId', descriptionController.deleteById);

const commentsController = require('./comments/commentsController');

router.get('/comments/:placeId', commentsController.indexByPlace);
router.get('/comments', commentsController.indexAll);
router.post('/createComment', commentsController.add);
router.put('/updateComment/:id', commentsController.update);
router.delete('/deleteComment/:id', commentsController.deleteById);

module.exports = router;
