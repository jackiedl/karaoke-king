import { Response, Request } from "express";
const asyncHandler = require("express-async-handler");

import { getUsers, addUser, getUserById, updateUserById, deleteUserById, loginUser } from "../services/UserService";

//@desc Get all users
//@route GET /api/users
//@access Public
const getUsersHandler = asyncHandler(async (req: Request, res: Response) => {
  const users = await getUsers();
  res.status(200).json(users);
});

//@desc Add a user
//@route POST /api/user
//@access Public
const addUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const users = await addUser(req.body);

  res.status(201).json(users);
});

//@desc Login a user
//@route POST /api/users/login
//@access Public
const loginUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const users = await loginUser(req.body.email, req.body.password);
  res.status(201).json(users);
});

//@desc Get a user by id
//@route GET /api/users/:id
//@access Public
const getUserByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const users = await getUserById(req.params.id);
  res.status(200).json(users);
});

//@desc Update a user by id
//@route PUT /api/users/:id
//@access Private
const updateUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const users = await updateUserById(req.params.id, req.body);
  
  res.status(200).json(users);
});

//@desc Delete a user by id
//@route DELETE /api/users/:id
//@access Private
const deleteUserHandler = asyncHandler(async (req: Request, res: Response) => { 
  await deleteUserById(req.params.id);
  res.status(200).json({message: `User ${req.params.id} deleted`});
});


module.exports = { 
  getUsersHandler, 
  addUserHandler, 
  loginUserHandler,
  getUserByIdHandler, 
  updateUserHandler, 
  deleteUserHandler 
};
