import { emailRegex } from "../schema/UserSchema";
import { UserType } from "../types/UserTypes";
import { checkIsValidObjectId } from "../database/db";
import HttpException from "../ultis/httpException";

export async function SanitizeUser(user: UserType) :Promise<UserType>{
  let sanitizedUser = <UserType>{};

  sanitizedUser.email = sanitizedEmail(user.email);
  sanitizedUser.isAdmin = sanitizedIsAdmin(user.isAdmin);
  sanitizedUser.username = sanitizedUsername(user.username);
  sanitizedUser.password = await sanitizedPassword(user.password);

  return sanitizedUser;
}

export async function sanitizedLoginUser(email:string, password:string): Promise<UserType>{
  let sanitizedUser = <UserType>{};

  sanitizedUser.email = sanitizedEmail(email);
  sanitizedUser.password = await sanitizedPassword(password);;

  return sanitizedUser
}


function sanitizedUsername(username: string):string{
  //Types
  if (username === undefined){
    throw new HttpException("Username is undefined", 400);
  }
  if (typeof username !== 'string'){
    throw new HttpException("Username is not a string", 400);
  }
  
  //Attributes
  username = username.trim();

  return username;
}

function sanitizedIsAdmin(isAdmin: boolean):boolean{
  //Types
  if (!isAdmin) isAdmin = false;

  return isAdmin;
}


function sanitizedEmail(email: string):string{
  //Types
  if (email === undefined){
    throw new HttpException("Email is undefined", 400);
  }
  if (typeof email !== 'string'){
    throw new HttpException("Email is not a string", 400);
  }
  
  //Attributes
  email = email.trim();
  if (email.length < 6){
    throw new HttpException("Email must be at least 6 characters", 400);
  }

  if (email.length > 50){
    throw new HttpException("Email must be less than 50 character", 400);
  }

  if (!email.match(emailRegex)){
    throw new HttpException("Please add a valid email", 400);
  }

  return email;
}

async function sanitizedPassword(password: string): Promise<string>{
  //Types
  if (password === undefined){
    throw new HttpException("Username is undefined", 400);
  }
  if (typeof password !== 'string'){
    throw new HttpException("Username is not a string", 400);
  }

  //Attributes
  password = password.trim();
  if (password.length < 6){
    throw new HttpException("Email must be at least 6 characters", 400);
  }

  if (password.length > 50){
    throw new HttpException("Email must be less than 50 character", 400);
  }

  return password;
}

export function sanitizedId(id: string | undefined): string{
  if (id === undefined){
    throw new HttpException("User id is undefined", 400);
  }

  checkIsValidObjectId(id);
  return id.valueOf();
}