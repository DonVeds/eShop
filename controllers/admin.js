const config = require('../config');

module.exports = {

  //GET /admin
  redirectAdmin(req, res){
    res.redirect('/admin/login')
  },


  // GET /admin/login   /admin/login?login=admin&password=123
  showAdminLogin(req, res){
    if (req.query.login == config.admin.login && req.query.password == config.admin.password) {
      res.redirect('/admin/panel')
    } else {
      res.render('admin/login', {
        title: 'Admin page'
      })
    }
  },

  showAdminPanel(req, res){
    res.render('admin')
  }


}