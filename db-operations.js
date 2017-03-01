function fetchNearestCops(db, coordinates, callback) {
    db.collection('policeData').createIndex({
        "location": "2dsphere"
    }, function() {
        db.collection("policeData").find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: coordinates
                    },
                    $maxDistance: 2000
                }
            }
        }).toArray(function(err, results) {
            if(err) {
                console.log(err)
            }else {
                callback(results);
            }
        });
    });
}
exports.fetchNearestCops = fetchNearestCops;

function fetchCopDetails(db, userId, callback) {
    db.collection("policeData").findOne({
        userId: userId
    }, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            callback({
                copId: results.userId,
                displayName: results.displayName,
                phone: results.phone,
                location: results.location
            });
        }
    });
}
exports.fetchCopDetails = fetchCopDetails;