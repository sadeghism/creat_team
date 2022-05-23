const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(13);
  return bcrypt.hashSync(password, salt);
}

function tokenGenerator(payload) {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "365 days",
  });
  return token;
};

function verifyTokenJwt(token){
  const result = jwt.verify(token , process.env.SECRET_KEY , {password:0});
  if(!result?.username) throw {status:401 , message:"لطفا وارد حساب کاربری خود شوید"}
  return result
}

module.exports = {
  hashPassword,
  tokenGenerator,
  verifyTokenJwt
};
