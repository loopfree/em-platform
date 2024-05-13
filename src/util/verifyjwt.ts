import jwt from "jsonwebtoken";

function verifyjwt(token: string, key: string) {
  let decoded;
  try {
    decoded = jwt.verify(token, key);
  } catch (e) {
    return null;
  }

  return decoded;
}

export default verifyjwt;
