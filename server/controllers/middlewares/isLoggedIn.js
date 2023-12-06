const jwt = require('jsonwebtoken');
const config = require('config');

const UserModel = require('../../models/user-model.js');
const { UserValidator } = require('../tools/validators.js');
const AppError = require('../tools/AppError.js');


async function isLoggedIn(req, resp, next) {
  try {
    const token = req.headers["x-auth-token"];
    UserValidator.notLoggedIn(token);


    const decodedToken = jwt.verify(token, config.get("jwtSecret"));
    const user_id = decodedToken.id;


    const user = await UserModel.findById(user_id);
    UserValidator.notFound(user);

    
    req.user = user;
    next();

  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError) 
      next(new AppError(401, "Unauthorized!"));
    
    next(err);
  }
}


module.exports = isLoggedIn;
