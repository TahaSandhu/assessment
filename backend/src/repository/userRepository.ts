import User from '../model/user/model';

export const createUser = async (userData: any) => {
  const user = new User(userData);
  return await user.save();
};

export const findByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const findByUsername = async (username: string) => {
  return await User.findOne({ username });
};

export const updateById = async (userId: string, updateData: any) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

export const updateByEmail = async (email: string, updateData: any) => {
  return await User.findOneAndUpdate({ email }, updateData, { new: true });
};
