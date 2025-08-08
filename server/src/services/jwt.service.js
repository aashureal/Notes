import jsonwebtoken from "jsonwebtoken";

export const generateToken = (data) => {
  return jsonwebtoken.sign(data, process.env.JWT_SECRET);
};
export const verifyToken = (token) => {
  return jsonwebtoken.verify(token, process.env.JWT_SECRET);
};
