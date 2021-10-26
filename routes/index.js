const usersRoutes = require("./usersRoutes");

module.exports = (app) => {
  app.use(usersRoutes);
};
