var express = require('express');
   router = express.Router();
   path = require('path');
   async = require('async');
   question=require(path.join(__dirname, '..','/model/question.js'));
   booth=require(path.join(__dirname, '..','/model/booth.js'));
   request=require(path.join(__dirname, '..','/model/request.js'));

router.get('/', function (req, res) {
   res.sendFile( path.join(__dirname, '..', "/views/index.html" ));
});


router.get('/newquestion', function (req, res) {
  //employee.getEmployeeListDetails(function(results){
    //res.json(results);
    res.sendFile( path.join(__dirname, '..', "/views/newQuestion.html" ));
  //});
  
});

router.post('/addquestion', function (req, res) {
  question.addQuestion(req.body,function(results){
      res.json(results);
   });
});

router.get('/showcategories',function (req, res) {
  question.showCategories(function(results){
      res.json(results);
   });
});

router.get('/showquestions',function (req, res) {
  question.showQuestionsByCategory(req.query.cat,function(results){
      res.render(path.join(__dirname, '..', "/views/questions.pug" ),{category : results});
   });
});

router.get('/newbooth', function (req, res) {
    res.sendFile( path.join(__dirname, '..', "/views/addbooth.html" ));
});

router.post('/addbooth', function (req, res) {
  booth.addBooth(req.body,function(results){
      res.json(results);
   });
});

router.post('/thankyou', function (req, res) {
  //TO DO insert  into expert table
  request.addRequest(req.body,function(results){console.log(results)});
  booth.getBoothByCategory(req.body.contact_category,function(results){
      res.render(path.join(__dirname, '..', "/views/thankyou.pug" ),{booth : results});
   });
});

router.get('/expertview',function (req, res) {
  request.showAllRequests(function(results){
      res.render(path.join(__dirname, '..', "/views/expertview.pug" ),{requests : results});
   });
});

router.get('/request',function (req, res) {
  request.findById(req.query.id,function(results){
      //res.json(results);
      res.render(path.join(__dirname, '..', "/views/requestDetails.pug" ),{request : results});
   });
});

router.post('/updaterequest',function (req, res) {
  request.updateRequest(req.body,function(results){
      res.json(results);
      //res.render(path.join(__dirname, '..', "/views/requestDetails.pug" ),{request : results});
   });
});

module.exports = router;