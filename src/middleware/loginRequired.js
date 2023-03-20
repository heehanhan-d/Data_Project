import jwt from "jsonwebtoken";

const loginRequired = (req, res, next) => {
  // authorization 검증
  if (req.headers.authorization === undefined) {
    res.status(401).json({
      error: "로그인이 필요 서비스입니다.",
      data: null,
    });
  }
  // 토큰 검증
  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const token = req.headers.authorization.slice(7); // slice 말고 다른 방법으로
    if (!token || token === "null") {
      res.status(401).json({
        result: "forbidden-approach",
        reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
      });
      return;
    }
    const userInfo = jwt.verify(token, secretKey);
    req.userId = userInfo.userId;
    res.locals.user = userInfo;

    next();
  } catch (error) {
    res.status(401).json({
      result: "forbidden-approach",
      reason: "정상적인 토큰이 아닙니다.",
    });
  }
};

export { loginRequired };
