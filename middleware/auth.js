const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.signedCookies.token;

  if (!token) return res.redirect("/login");

  try {
    req.user = jwt.verify(token, "nwQXdZRMCt3MWrTDz77vpfGVDIzZR2L9");
    next();
  } catch (err) {
    console.log(err);
  }
};
