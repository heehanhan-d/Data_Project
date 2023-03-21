const errorMiddleware = async (error, req, res, next) => {
  console.log("❗" + error);
  res.status(400).send(error.message);
};

export default errorMiddleware;
