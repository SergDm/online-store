module.exports = function(req, res, next) {
  if(!req.session.user.admin){
    return res.redirect('/')
  }
  next()
}