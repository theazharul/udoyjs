var config = function (req, res, next) {
   res.locals = {
       institute: 'Crescent Model School and College',
       copyright: 'Precursor Technology'
       
   };
    next();
};
module.exports = config;
