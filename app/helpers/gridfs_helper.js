var fs = require('fs');
var Grid = require('gridfs-stream');
var mongoose = require('mongoose');

var gridFs = {
    singleImageUpload: function(req, res, config){
                //Upload Image
        var dirname = require('path').join(__dirname, '../..');
        var filename = req.file.filename;
        var path = req.file.path;
        var type = req.file.mimetype;
        var full_path = dirname + '/' + path;
        var extension = req.file.path.split(/[. ]+/).pop();

        Grid.mongo = mongoose.mongo;
        var conn = mongoose.createConnection(config.database.url);
        conn.once('open', function () {
            var gfs = Grid(conn.db);

       var writestream = gfs.createWriteStream({
            filename: filename
        });

        var read_stream =  fs.createReadStream(full_path);
        read_stream.pipe(writestream);
            writestream.on('close', function (file) {
        // do something with `file`
        console.log(file.filename + ' Written To DB');
    });
        });

    },

    getFile: function(filename, config){
        Grid.mongo = mongoose.mongo;
        var conn = mongoose.createConnection(config.database.url);

        conn.once('open', function () {
            var gfs = Grid(conn.db);

            var readstream = gfs.createReadStream({
                filename: filename 
            });

//error handling, e.g. file does not exist
readstream.on('error', function (err) {
  console.log('An error occurred!', err);
  throw err;
});

readstream.pipe(response);
        });
    }   
};
module.exports = gridFs;
