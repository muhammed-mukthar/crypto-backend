const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const isAdmin = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decodedData = jwt.verify(token, process.env.JWTSECRET);
      const agent = await User.findOne({ email: decodedData.email });

      if (agent) {
        if (agent.role === "admin") {
          req.user = agent;
          next();
        } else {
          res
            .status(403)
            .json({ message: "You need Administation Access for this action" });
        }
      } else {
        res.status(401).json({ message: "Invalid token" });
      }
    } else {
      res.status(401).json({ message: "Please try after login" });
    }
  } catch (error) {
    console.log(error.name);
    console.log(error);
    res.status(401).json({ message: "Please try after login" });
  }
};
module.exports = isAdmin;
