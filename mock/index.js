const express = require("express");
const vipLogin = require("./data/vip_login.json");
const adminLogin = require("./data/admin_login.json");
const authList = require("./data/auth.json");
const logout = require("./data/logout.json");
// const url = require('url');

const app = express();

app.post("/login", (req, res) => {
  const { username } = req;
  if (username == "admin") {
    res.send(adminLogin);
  } else {
    res.send(vipLogin);
  }
});

app.get("/auth", (req, res) => {
  // const auth = url.parse(req.url, true).query.auth;
  res.send(authList);
});

app.post("/logout", (req, res) => {
  // const auth = url.parse(req.url, true).query.auth;
  res.send(logout);
});

app.listen(3300, () => {
  console.log("服务启动3300");
});
