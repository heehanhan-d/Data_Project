import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../db";

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  
  async addUser(userInfo) {
    const { email, name, password } = userInfo;

    // 이메일 중복확인
    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new Error("이미 사용중인 이메일 입니다."); // 500이 맞나..?
    }

    // 비밀번호를 해쉬화해서 회원정보를 만들고
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserInfo = { name, email, password: hashedPassword };
    const createdNewUser = await this.userModel.create(newUserInfo); // Model에 생성한 유저를 넣어 줍니다.

    return createdNewUser;
  }

  //  Token 발급 로직
  async getUserToken(loginInfo) {
    const { email, password } = loginInfo;

    // 이메일 검증
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error("이메일이 일치하지 않습니다.");
    }

    // 비밀번호 비교
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash,
    );

    if (!isPasswordCorrect) {
      throw new Error("패스워드가 일치하지 않습니다.");
    }

    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

    const token = jwt.sign({ userId: user._id, pe: user.isAdmin }, secretKey, {
      expiresIn: "24h", // 1일 발급
    });

    // 관리자 스키마 추가 필요!
    const isAdmin = user.isAdmin === true;

    return { token, isAdmin };
  }
}

const userService = new UserService(userModel);

export { userService };

  
