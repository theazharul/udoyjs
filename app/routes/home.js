var home = function(app){
  
    app.get('/', function(req, res){
       
        res.render('home');
      });
};    
module.exports = home;
