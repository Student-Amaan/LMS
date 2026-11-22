const login = require("./auth.service");

const loginController = async (req, res) => {
  const { admin, token } = await login(req.body);
  res.cookie("accessToken", token, {
    httpOnly: true,
    sameSite: "strict",
  });
  res.status(201).json({ success: true, admin, token });
};

const getMe = async (req, res) => {
  res.status(200).json({ success: true, data: req.user });
};

module.exports = { loginController, getMe };
