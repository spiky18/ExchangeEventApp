var mongoose = require('mongoose');

var dbHost = 'mongodb://localhost:27017/calendar';
var conn = mongoose.createConnection(dbHost);

var requestSchema = mongoose.Schema({
  category: String,
  question: String,
  custom_question: String,
  CRM: String,
  customer:{
  	name: String,
  	representative: String,
  	email:String,
  	phone:String
  },
  notes : [{addedBy : String,crm : String,,text:String,_id:false}}],
  updatedBy : String,
  creationTime: Date,
  updationTime : Date

});

var Request = conn.model('Request', requestSchema);

module.exports.addRequest=function(body,callback){
	var request=new Request({
		category:body.category,
		//question:body.question,
		custom_question:body.moreInfo,
		customer:{
			name:body.customerName,
			representative:body.repName,
			email:body.email,
			phone:body.phone
		},
		updatedBy:body.customerName,
		creationTime: new Date(),
  		updationTime : new Date()
	});
	request.save(function(err, result){
    if ( err ) throw err;
    callback({
      messaage:"Successfully added request",
      request:result
    });
  });
}

module.exports.showAllRequests=function(callback){
	Request.find({},function(err,results){
	if(err)
		console.log(err);
	callback(results);
});
}

module.exports.findById=function(id,callback){
	Request.findOne({_id:Object(id)},function(err,results){
	if(err)
		console.log(err);
	callback(results);
});
}


module.exports.updateRequest =function(body,callback){
	Request.update({_id:Object(body.request_id)},{$set:{"CRM":body.crm,"updatedBy":body.empName,"updationTime":new Date()},$addT},function(err,results){
	if(err)
		console.log(err);
	callback(results);
});
}

