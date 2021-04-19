const mongoose = require("mongoose");

const db = {};

db.mongoose = mongoose;
db.user = require("./users.model");

module.exports = db;