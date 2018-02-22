module.exports = function careateFlashMiddleware() {
  return function flash(req, res, next) {
    req.flash = function(level) {
      req.session.flash = level;
    };

    let flash = req.session.flash;
    delete req.session.flash;

    if (flash == 'cart') {
      res.locals.flashCart = true;
    } else if (flash == 'wishlist') {
      res.locals.flashWishlist = true;
    }
    

    next();
  };
};
