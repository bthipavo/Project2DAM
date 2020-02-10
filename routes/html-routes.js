var path = require("path");

//Routes
module.exports = function(app) {

    app.get("/shop", function(req, res) {
        res.sendFile(path.join(__dirname, "../../views/shop.html"));
      });

    app.get("/profile", function(req, res) {
        res.sendFile(path.join(__dirname, "../../views/profile.html"));
    });

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../../views/index.html"));
    });

    app.get("/checkout", function(req, res) {
        res.sendFile(path.join(__dirname, "../../views/checkout.html"));
    });
    app.get("/confirmation", function(req, res) {
        res.sendFile(path.join(__dirname, "../../views/confirmation.html"));
    });

};