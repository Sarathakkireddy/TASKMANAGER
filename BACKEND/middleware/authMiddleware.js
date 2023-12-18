const jwt = require("jsonwebtoken");
const accountModel = require("../models/account");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization
  ) {
    try {
      token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await accountModel.findById(decoded.id).select("-password");
      next();
    } catch (e) {
      res.status(401).json({
        message: e.message,
      });
    }
  }

  if (!token) {
    res.status(400);
    res.json({ message: "Not authorized, no token" });
  }
};

module.exports = {
  protect,
};
