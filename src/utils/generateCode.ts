import crypto from "crypto";

export const generateCode = () => {
  return crypto.randomInt(1000, 9999).toString();
};

export const invitationCode = () => {
  return crypto.randomInt(100000000000, 999999999999).toString();
};
