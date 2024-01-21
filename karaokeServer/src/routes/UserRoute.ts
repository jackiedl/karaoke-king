import express from 'express';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

const { 
  getUsersHandler, 
  addUserHandler,
  loginUserHandler, 
  getUserByIdHandler, 
  updateUserHandler, 
  deleteUserHandler 
} = require("../controllers/UserController");

router.route('/')
  .get(protect, getUsersHandler)
  .post(protect, addUserHandler);
  
router
  .route('/:id')
  .get(protect, getUserByIdHandler)
  .put(updateUserHandler)
  .delete(protect, deleteUserHandler);

router.route('/login').post(loginUserHandler);

module.exports = router;