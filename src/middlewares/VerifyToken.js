"use strict";
const jwt = require("jsonwebtoken");

async function verifyToken(ctx) {
  var token = ctx.headers.authorization;

  if (!token) return -1;
  token = token.split(" ");
  token = token[1];
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}

module.exports = verifyToken;
