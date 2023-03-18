// eslint-disable-next-line import/no-unresolved, node/no-missing-import
import is from "@sindresorhus/is"; // 빈 객체 체크를 위한 모듈
import jwt from "jsonwebtoken";
import { userService } from "../services";

const appjson = "headers의 Content-Type을 application/json으로 설정해주세요";

class UserController {
  // 회원가입 테스트
  async register(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        // 빈 객체 체크
        throw new Error(appjson);
      }
      const { name, email, password } = req.body;
      const newUser = await userService.addUser({
        name,
        email,
        password,
      });
      const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

      const token = jwt.sign(
        { userId: email._id, pe: email.isAdmin },
        secretKey,
        {
          expiresIn: "1h",
        },
      );

      const isAdmin = false; // 관리자는 따로 테이블에 넣어줍시다.

      res.status(201).json({ newUser, token, isAdmin });
    } catch (error) {
      next(error);
    }
  }

  //  로그인
  async login(req, res, next) {
    try {
      // 빈 객체 체크
      if (is.emptyObject(req.body)) {
        throw new Error(appjson);
      }
      const { email, password } = req.body;
      const result = await userService.getUserToken({ email, password });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController(userService);

export { userController };

