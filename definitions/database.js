const MongoClient = require('mongodb').MongoClient;
let DB = null;

F.wait('database');

MongoClient.connect(
  CONFIG('mongo_db'), { useNewUrlParser: true },
  (err, db) => {
    if (err) throw err;
    DB = db.db(CONFIG('database'));
    F.wait('database');
  },
);

F.database = function(collection) {
  return collection ? DB.collection(collection) : DB;
};
