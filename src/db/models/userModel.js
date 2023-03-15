import { model } from "mongoose";
import UserSchema from "../schemas/userSchema";

const User = model("users", UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }
}

const userModel = new UserModel();

export { userModel };
