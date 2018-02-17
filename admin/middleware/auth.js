module.exports = {
  allowAdmin(req, res, next) {
    console.log(req.user.role);
    
    if (req.user.role === 'admin') {
      next()
    } else {
      res.redirect('/')
    }
  }
}