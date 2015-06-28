var config = function (req, res, next) {
   res.locals = {
       'institute' : 'UdoyJS',
       'copyright' : 'udoyjs',
       'theme' : 'default'
   };
    next();
};

module.exports = config;
