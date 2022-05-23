const { UserModel } = require("../../model/userModel");
const { verifyTokenJwt } = require("../../module/functions");

const autoLogin = async (req, res, next) => {
  try {
    const authorizationError = "لطفا وارد حساب کاربری خود شوید";
    const authorization = req?.headers?.authorization;
    if (!authorization) throw authorizationError;
    let token = authorization.split(" ")?.[1];
    if (!token) throw authorizationError;
    const result = verifyTokenJwt(token);
    const { username } = result;
    const user = await UserModel.findOne({ username });
    if (!user) throw authorizationError;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  autoLogin,
};
