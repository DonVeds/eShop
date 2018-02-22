module.exports = {
  // GET /
  showMainPage(req, res) {
    res.render('index', {
      title: 'Main Page',
      name: req.name,
      login: req.login,
      password: req.password
    });
  }
};
