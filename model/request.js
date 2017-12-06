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
  notes : [{addedBy : String,crm : String,text:String,_id:false}],
  queryType:String,
  updatedBy : String,
  creationTime: Date,
  updationTime : Date

});

var Request = conn.model('Request', requestSchema);

module.exports.addRequest=function(body,callback){
	var request=new Request({
		category:body.contact_category,
		//question:body.question,
		custom_question:body.contact_question,
		customer:{
			name:body.contact_customer,
			representative:body.contact_name,
			email:body.contact_email,
			phone:body.contact_phone
		},
		updatedBy:body.contact_customer,
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
	Request.aggregate([{$sort:{creationTime:-1}}],function(err,results){
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
	Request.update({_id:Object(body.request_id)},{$set:{"CRM":body.record_crm,"queryType":body.record_query_type,"updatedBy":body.record_expert_name,"updationTime":new Date()},$addToSet:{"notes":{addedBy:body.record_expert_name,crm:body.record_crm,text:body.record_notes}}},function(err,results){
	if(err)
		console.log(err);
	callback(results);
});
}

module.exports.getDataByTypeAndCategory=function(callback){
	Request.aggregate([{$group:{_id:{qtype:"$queryType",cat:"$category"},count:{$sum:1}}}],function(err,results){
	if(err)
		console.log(err);
	callback(results);
});
}

