import mongoose from 'mongoose';
import UserSchema, {IUserSchema} from '../schema/UserSchema';

const UserModel = mongoose.model<IUserSchema>('users', UserSchema);

export default UserModel;