const jwt = require('jsonwebtoken');
const config = require('config');


module.exports.createJWToken = function (user_id) {
  const payload = { 
    id: Number(user_id)
  }

  const token = jwt.sign(payload, process.env.jwtSecret, {
    expiresIn: "30d"
  });

  return token;
}



module.exports.toInt = function (num, fallback = 0){
  const n = parseInt(num);
  return isNaN(n) ? fallback : n;
}