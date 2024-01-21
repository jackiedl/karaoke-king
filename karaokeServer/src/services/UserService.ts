import bcrypt from 'bcryptjs';
import { checkIsValidObjectId } from "../database/db";
import { SanitizeUser, sanitizedLoginUser } from '../sanitizers/UserSanitizer';
import UserModel from '../models/UserModel';
import { IUserSchema } from '../schema/UserSchema';
import { UserReturnType, UserType } from '../types/UserTypes'
import HttpException from '../ultis/httpException';
import { generateToken } from './TokenService';


export async function getUsers(): Promise<UserType[]>{
  try{
    const users = await UserModel.find();
    if (!users) throw new HttpException('Users not found', 404);

    return users;
  }
  catch(err){
    throw new HttpException(`Error finding user ${err}`, 400);
  }
}

export async function addUser(user: UserType): Promise<UserReturnType>{
  const sanitizeUser = await SanitizeUser(user);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(sanitizeUser.password, salt);

  try{
    const newUser = await UserModel.create({
      username: sanitizeUser.username,
      email: sanitizeUser.email,
      password: hashedPassword,
      isAdmin:sanitizeUser.isAdmin
    });
    if (!newUser) throw new HttpException('User was not created', 400);

    return {
      _id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken({
        _id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      })
    };
  }
  catch(err){
    throw new HttpException(`Failed to add new user ${err}`, 500);
  }
}
export async function loginUser(email: string, password: string): Promise<UserReturnType>{
  const sanitizedUser = await sanitizedLoginUser(email, password);
  try{
    const user = await UserModel.findOne({ email });
    if (!user) throw new HttpException('User not found', 404);

    const isPasswordValid = await bcrypt.compare(sanitizedUser.password, user.password);
    if (!isPasswordValid) throw new HttpException('Password is invaild', 401);

    return {
      _id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken({
        _id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    }
  }
  catch(err){
    throw new HttpException(`Failed to login user ${err}`, 401);
  }
}

export async function getUserById(userId: string): Promise<IUserSchema>{
  checkIsValidObjectId(userId);
  try{
    const user = await UserModel.findById(userId);
    if (!user) throw new HttpException('User not found',404);

    return user;
  }
  catch(err){
    throw new HttpException(`Error finding user ${err}`, 400);
  }
}

export async function updateUserById(userId: string, user: UserType): Promise<IUserSchema>{
  checkIsValidObjectId(userId);
  const sanitizeUser = await SanitizeUser(user);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(sanitizeUser.password, salt);
  sanitizeUser.password = hashedPassword;
  try{
    const updatedUser = await UserModel.findByIdAndUpdate(userId, sanitizeUser, {new: true});
    if (!updatedUser) throw new HttpException('User was not updated', 404);

    return updatedUser;
  }
  catch(err){
    throw new HttpException(`Error updating user ${err}`, 400);
  }
}

export async function deleteUserById(userId: string): Promise<void>{
  checkIsValidObjectId(userId);
  try{
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) throw new HttpException('User was not found', 404);
  }
  catch(err){
    throw new HttpException(`Failed to delete user: ${err}`, 400);
  }
}