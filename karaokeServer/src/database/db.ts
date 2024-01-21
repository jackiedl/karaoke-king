import mongoose from 'mongoose';
import { MONGO_URI } from '../ultis/config';
import HttpException from '../ultis/httpException';

export const connectDB = async () => {
  if (!MONGO_URI){
    console.log("MONGO_URI is not defined in the env file");
    process.exit(1);
  }
  try{
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  }
  catch (err:any){
    console.log(err.message);
    process.exit(1);
  }
};

export function checkIsValidObjectId(id: string){
  if (!mongoose.Types.ObjectId.isValid(id)){
    throw new HttpException(`${id} is not a vaild id`, 400);
  }
}