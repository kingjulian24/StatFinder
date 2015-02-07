var db = require('./db');

module.exports = function(data) {
  db.save( data,
    function  (err, res) {
      if (err){
        console.log('failed to save '+data.id);
      } else {
        console.log('saved: '+data.store_name+', '+data._id);
      }
  });
};

