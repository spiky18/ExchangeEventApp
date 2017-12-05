var mongoose = require('mongoose');

var dbHost = 'mongodb://localhost:27017/calendar';
var conn = mongoose.createConnection(dbHost);

var boothSchema = mongoose.Schema({
  category: String,
  boothNo : Number
});

var Booth = conn.model('Booth', boothSchema);

module.exports.addBooth=function(body,callback){
  console.log("test",body.test);
	var booth=new Booth({
		category:body.category,
		boothNo:body.boothNo
	});
	booth.save(function(err, result){
    if ( err ) throw err;
    callback({
      messaage:"Successfully added booth",
      booth:result
    });
  });
}

module.exports.getBoothByCategory=function(cat,callback){
  Booth.findOne({category:cat},function(err,results){
  if(err)
    console.log(err);
  callback(results);
});
}