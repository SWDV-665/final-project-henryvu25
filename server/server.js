// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/stories");

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Models
var Character = mongoose.model('Character', {
    title: String,
    name: String,
    race: String,
    description: String
});

var Plot = mongoose.model('Plot', {
    title: String,
    element: String,
    sceneName: String,
    description: String
});

var Place = mongoose.model('Place', {
    title: String,
    locale: String,
    name: String,
    description: String
});

//CHARACTER OPERATIONS
// Get all characters
app.get('/api/characters', function (req, res) {

    console.log("Listing characters...");

    //use mongoose to get all characters in the database
    Character.find(function (err, characters) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(characters); // return all characters in JSON format
    });
});

// Create a character
app.post('/api/characters', function (req, res) {

    console.log("Creating character...");

    Character.create({
        title: req.body.title,
        name: req.body.name,
        race: req.body.race,
        description: req.body.description,
        done: false
    }, function (err, character) {
        if (err) {
            res.send(err);
        }

        // create and return all the characters
        Character.find(function (err, characters) {
            if (err)
                res.send(err);
            res.json(characters);
        });
    });

});

// Update a character
app.put('/api/characters/:id', function (req, res) {
    const character = {
        title: req.body.title,
        name: req.body.name,
        race: req.body.race,
        description: req.body.description
    };
    console.log("Updating character - ", req.params.id);
    Character.update({_id: req.params.id}, character, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete a character
app.delete('/api/characters/:id', function (req, res) {
    Character.remove({
        _id: req.params.id
    }, function (err, character) {
        if (err) {
            console.error("Error deleting character ", err);
        }
        else {
            Character.find(function (err, characters) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(characters);
                }
            });
        }
    });
});


//PLOT OPERATIONS
// Get all plots
app.get('/api/plots', function (req, res) {

    console.log("Listing plots...");

    //use mongoose to get all plots in the database
    Plot.find(function (err, plots) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(plots); // return all plots in JSON format
    });
});

// Create a plot
app.post('/api/plots', function (req, res) {

    console.log("Creating plot...");

    Plot.create({
        title: req.body.title,
        element: req.body.element,
        sceneName: req.body.sceneName,
        description: req.body.description,
        done: false
    }, function (err, plot) {
        if (err) {
            res.send(err);
        }

        // create and return all the plots
        Plot.find(function (err, plots) {
            if (err)
                res.send(err);
            res.json(plots);
        });
    });

});

// Update a plot
app.put('/api/plots/:id', function (req, res) {
    const plot = {
        title: req.body.title,
        element: req.body.element,
        sceneName: req.body.sceneName,
        description: req.body.description
    };
    console.log("Updating plot - ", req.params.id);
    Plot.update({_id: req.params.id}, plot, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete a plot
app.delete('/api/plots/:id', function (req, res) {
    Plot.remove({
        _id: req.params.id
    }, function (err, plot) {
        if (err) {
            console.error("Error deleting plot ", err);
        }
        else {
            Plot.find(function (err, plots) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(plots);
                }
            });
        }
    });
});

//PLACE OPERATIONS
// Get all places
app.get('/api/places', function (req, res) {

    console.log("Listing places...");

    //use mongoose to get all places in the database
    Place.find(function (err, places) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(places); // return all places in JSON format
    });
});

// Create a place
app.post('/api/places', function (req, res) {

    console.log("Creating place...");

    Place.create({
        title: req.body.title,
        locale: req.body.locale,
        name: req.body.name,
        description: req.body.description,
        done: false
    }, function (err, place) {
        if (err) {
            res.send(err);
        }

        // create and return all the places
        Place.find(function (err, places) {
            if (err)
                res.send(err);
            res.json(places);
        });
    });

});

// Update a place
app.put('/api/places/:id', function (req, res) {
    const place = {
        title: req.body.title,
        locale: req.body.locale,
        name: req.body.name,
        description: req.body.description
    };
    console.log("Updating place - ", req.params.id);
    Place.update({_id: req.params.id}, place, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete a place
app.delete('/api/places/:id', function (req, res) {
    Place.remove({
        _id: req.params.id
    }, function (err, place) {
        if (err) {
            console.error("Error deleting place ", err);
        }
        else {
            Place.find(function (err, places) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(places);
                }
            });
        }
    });
});


// Start app and listen on port 8080  
app.listen(process.env.PORT || 8080);
console.log("Server listening on port  - ", (process.env.PORT || 8080));