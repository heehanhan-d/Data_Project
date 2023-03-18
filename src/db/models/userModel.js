import { model } from "mongoose";
import UserSchema from "../schemas/userSchema";

const User = model("users", UserSchema);

export class UserModel {
  // 가입 이메일 중복
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  // 유저 추가
  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }
}


const userModel = new UserModel();

export { userModel };

