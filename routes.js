var dbOperations = require('./db-operations');

function initialize(app, db, socket, io) {
    // '/cops?lat=12.9718915&&lng=77.64115449999997'
    app.get('/cops', function(req, res){
        //Convert the query strings into Numbers
        var latitude = Number(req.query.lat);
        var longitude = Number(req.query.lng);
        dbOperations.fetchNearestCops(db, [longitude,latitude], function(results){
        //return the results back to the client in the form of JSON
            res.json({
                cops: results
            });
        });  
    });

    // GET request to '/cops/info?userId=02'
    app.get('/cops/info', function(req, res){
        var userId = req.query.userId //extract userId from query params
        dbOperations.fetchCopDetails(db, userId, function(results){
            res.json({
                copDetails: results //return results to client
            });
        });
    });
}

exports.initialize = initialize;