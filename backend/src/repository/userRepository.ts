import User from '../model/user/model';

class UserRepository {
  async create(userData: any) {
    const user = new User(userData);
    return await user.save();
  }

  async findByEmail(email: string) {
    return await User.findOne({ email });
  }

  async updateById(userId: string, updateData: any) {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  }

  async updateByEmail(email: string, updateData: any) {
    return await User.findOneAndUpdate({ email }, updateData, { new: true });
  }
}

export default new UserRepository();
