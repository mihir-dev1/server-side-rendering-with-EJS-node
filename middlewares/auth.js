const { getUser } = require("../services/auth");

const authMiddleware = (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) {
    return res.redirect("/login");
    // return res.status(401).json({ error: 'Unauthorized: No session ID' });
  }
  const user = getUser(sessionId);
  if (!user) {
    return res.redirect("/login");
    // return res.status(401).json({ error: 'Unauthorized: Invalid session' });
  }
  req.user = user; // Attach user info to request object
  next();
};

const checkAuth = (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) {
    return res.render("/login");
  }
  const user = getUser(sessionId);
  if (!user) {
    return res.render("/login");
  }
  req.user = user;
  next();
};

module.exports = { authMiddleware, checkAuth };
