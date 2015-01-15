var db = require('./db');

module.exports = function (id,rq,rs) {
  db.remove(id, function (err, res) {
    if(!err) {
      rq.method = 'get';
      rs.redirect('/?id='+ id +'&action=Deleted');
    } else {
      console.log('deletion failed, id:' +id);
      rs.status(404).send('deletion failed, id:' +id);
    }
  });
};
