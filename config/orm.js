//Importing the MySQL Connection
var connection = require("../config/connection.js");

//Helper Function for MySQL Syntax that allows us to pass three values
//into the MySQL query. In order to write the query, we need three question marks.
//This helper function loops through and creates as array of question marks - ["?", "?", "?"] -
//and turns it into a string. ["?", "?", "?"].toString => "?, ?, ?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

// Function Converts Object Key/Value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
// Loop through the keys and Push the Key/Value as a string into arr
for (var key in ob) {
    var value = ob[key];

    //check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >=0) {
            value = "'" + value + "'";
        }
//Examples Below:
//e.g. {name: 'Lana Del Grey'} => ["name = 'LanaDel Grey'"]
//e.g. {sleepy: true} => ["sleepy=true"]

        arr.push(key + "=" + value);
    }
}    

//Translate array of strings to a single comma-separated string
return arr.toString();
}

//Object for all of the SQL Statement Functions
var orm = {
selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
        if (err) {
            throw err;
        }
        cb(result);
    });
},
insertOne: function(table, cols, vals, cb) {
var queryString = "INSERT INTO " + table;

queryString += "(";
queryString += cols.toString();
queryString += ")";
queryString += "VALUES (";
queryString += printQuestionMarks(vals.length);
queryString += ")";

console.log(queryString);

connection.query(queryString, vals, function(err, result) {
    if (err) {
        throw err;
    }
    cb(result);
});
},
updateOne: function(table, objColVals, condition, cb) {
var queryString = "UPDATE " + table;

queryString += " SET ";
queryString += objToSql(objColVals);
queryString += " WHERE ";
queryString += condition;

console.log(queryString);
connection.query(queryString, function(err, result) {
    if (err) {
        throw err;
    }
    cb(result);
});
}

};

// Exporting the ORM File
module.exports = orm;


