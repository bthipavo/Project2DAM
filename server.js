  
  
  // const stripe = require('stripe')(pk_test_0uwz6cLFxSQZi0pFYpzjhFQ500rdecdAox)
  // var elements = stripe.elements()

  var express = require("express");
  const fs = require('fs') //allows us to read different files

  var app = express();

  // =============================================================
  var PORT = process.env.PORT || 3000;
  // Sets up the Express app to handle data parsing

  var db = require('./models')

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // Static directory
  app.use(express.static("public")); 

 
  // Routes
  // =============================================================
  // require("./app/routes/api-routes.js")(app);
  require("./app/routes/html-routes")(app);
  // Starts the server to begin listening
  // =============================================================

  // app.listen(PORT, function() {
  //   console.log("App listening on PORT " + PORT);
  // });
  
  db.sequelize.sync({ force: true}).then(function() {
    console.log('db connected') 
    app.listen(PORT, function() { 
      console.log('app listening on port ' + PORT)
    })
  })