import User from "../db/models/userModel";
import bcrypt from "bcrypt";

//회원가입
export const postJoin = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  //이메일 중복확인
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).send("이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.");
  }

  // 패스워드 해쉬화
  let saltRounds = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    return res.send("성공");
  } catch (error) {
    res.status(400).send(error);
  }
};

export default { postJoin };