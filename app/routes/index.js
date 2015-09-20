module.exports = function(app, config){
    require('./home')(app);
    require('./users')(app);  
};
