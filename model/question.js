var mongoose = require('mongoose');

var dbHost = 'mongodb://localhost:27017/calendar';
var conn = mongoose.createConnection(dbHost);

var questionSchema = mongoose.Schema({
  category: String,
  question : String
});

var Question = conn.model('Question', questionSchema);

module.exports.addQuestion=function(body,callback){
	var question=new Question({
		category:body.category,
		question:body.question
	});
	console.log(body.category+" "+body.question);
	question.save(function(err, result){
    if ( err ) throw err;
    callback({
      messaage:"Successfully added employee",
      question:result
    });
  });
}

module.exports.showCategories=function(callback){
	
	Question.aggregate([{$group:{_id:"$category"}}],function(err,results){
  if(err)
    console.log(err);
  callback(results);
});
}

module.exports.showQuestionsByCategory=function(category,callback){
	
	Question.aggregate([{$match:{"category":category}},{$group:{_id:category,questions:{$push:"$question"}}}],function(err,results){
  if(err)
    console.log(err);
  callback(results);
});
}
