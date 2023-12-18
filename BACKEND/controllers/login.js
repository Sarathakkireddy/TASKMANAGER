const accountModel = require("../models/account");
const generateToken = require("../utils/jwt");
const { match } = require("../utils/passHash");

const sendresponse = (account, password, res) => {
  if (account.length) {
    if (match(password, account[0].password)) {
      res.status(200).json({
        token: generateToken(account[0]._id),
        id:account[0]._id,
      });
    } else {
      res.status(401).json({ message: "wrong password" });
    }
  } else {
    res.status(400).json({ message: "user not found" });
  }
};

const login = async (req, res) => {
  try {
    const { selector, userid, password } = req.body;
    if (selector === "contact") {
      const account = await accountModel.find({ contact: userid });
      if (!account.length) {
        res.status(400).json({ message: "User not found" });
      } else {
        sendresponse(account, password, res);
      }
    } else {
      const account = await accountModel.find({ email: userid });
      if (!account.length) {
        res.status(400).json({ message: "User not found" });
      } else {
        sendresponse(account, password, res);
      }
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports = login;
