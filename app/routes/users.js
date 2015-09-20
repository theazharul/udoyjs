var passport = require('passport');

module.exports = function(app){
    /* GET Login Registration page. */
    app.get('/login_registration', function(req, res) {
        res.render('login_registration', { message: { login : req.flash('loginMessage'), signup : req.flash('signupMessage')} });
    });

    // process the signup form
    app.post('/login_registration', function(req, res, next){
         
        if(typeof req.body.r_email != 'undefined'){
            console.log('reg :'+req.body.r_email);
             passport.authenticate('local-signup', {
                 successRedirect : '/', // redirect to the secure profile section
                 failureRedirect : '/login_registration', // redirect back to the signup page if there is an error
                 failureFlash : true // allow flash messages
             })(req, res, next);
        }
        else{
            console.log('log: '+req.body.l_email);
             passport.authenticate('local-login', {
                 successRedirect : '/', // redirect to the secure profile section
                 failureRedirect : '/login_registration', // redirect back to the signup page if there is an error
                 failureFlash : true // allow flash messages
             })(req, res, next);
        }
       
    });

    /*

 passport.authenticate('local-signup', {
                 successRedirect : '/', // redirect to the secure profile section
                 failureRedirect : '/login_registration', // redirect back to the signup page if there is an error
                 failureFlash : true // allow flash messages
             }),
             passport.authenticate('local-login', {
                 successRedirect : '/', // redirect to the secure profile section
                 failureRedirect : '/login_registration', // redirect back to the signup page if there is an error
                 failureFlash : true // allow flash messages
             })
*/
    // process the login form
  //  app.post('/login_registration', );
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });  
}; 

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
   
