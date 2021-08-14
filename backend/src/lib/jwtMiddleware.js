import jwt from "jsonwebtoken";

const JWT_SECRET = "97usdfnh87sdfjnb324";

const jwtMiddleware = (ctx, next) => {
  const token = ctx.cookies.get("access_token");
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username,
    };
    return next();
  } catch (e) {
    return next();
  }
};

export default jwtMiddleware;
