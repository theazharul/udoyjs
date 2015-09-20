var authHelper = {
    isLoggedIn: function (req, res, next) {
    if (req.user) {
res.locals.user = req.user;
        next();
    } else {

        req.flash("loginMessage", "You have to Login First!");
        res.redirect('/login_registration');
    }
}
};
module.exports = authHelper;
