import { model } from 'mongoose';
import UserSchema from './schema';

const User = model('User', UserSchema);

export default User;
