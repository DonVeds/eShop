module.exports = {
  allowAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next()

    res.status(403).redirect('/user/login')
  },

  allowUnauthenticated(req, res, next) {
    if (req.isUnauthenticated()) return next()

    res.redirect('/buy/topics')
  }
}