var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var app = express();
var fs = require("fs");
var jwt = require("jsonwebtoken");
var crypto = require('crypto');
var azure = require('azure-storage');
var path = require("path");

var blobSvcURL = 'DefaultEndpointsProtocol=https;AccountName=mybookblob;AccountKey=UvrPUVEUJSdDmpWfUE69v3GwWhLF2n7dp/w/aG+q6GpxJTTbINVOe301n1okxkRHnVvGuiDcKyNQA584AI2FjA==;EndpointSuffix=core.windows.net';

var blobUrl = 'https://mybookblob.blob.core.windows.net/';

var containerName = 'mybookcontainer';

var blobBaseURL = blobSvcURL+containerName+'/';

var defaultImgURL = blobBaseURL+'default_dp.png';

var blobSvc = azure.createBlobService(blobSvcURL);

var secret = "vaibhavankushrachitkabircol733assignmentazure";

var hierarchy_json = {
          "mess_complaint":{
                  "kumaon":{
                        "director":"director_id",
                        "dosa":"dosa_id",
                        "asso_dean_hm":"asso_dean_hm_id",
                        "warden":"warden_kumaon_id",
                        "house_secy":"house_secy_kumaon_id",
                        "mess_secy":"mess_secy_kumaon_id"
                  },
                  "vindhyachal":{
                        "director":"director_id",
                        "dosa":"dosa_id",
                        "asso_dean_hm":"asso_dean_hm_id",
                        "warden":"warden_vindhyachal_id",
                        "house_secy":"house_secy_vindhyachal_id",
                        "mess_secy":"mess_secy_vindhyachal_id"
                  }
          },
          "maintenance_complaint":{
                  "kumaon":{
                        "director":"director_id",
                        "dosa":"dosa_id",
                        "asso_dean_hm":"asso_dean_hm_id",
                        "warden":"warden_kumaon_id",
                        "house_secy":"house_secy_kumaon_id",
                        "maintenance_secy":"maintenance_secy_kumaon_id"
                  },
                  "vindhyachal":{
                        "director":"director_id",
                        "dosa":"dosa_id",
                        "assodean_hm":"assodean_hm_id",
                        "warden":"warden_vindhyachal_id",
                        "housesecy":"housesecy_vindhyachal_id",
                        "maintenance_secy":"maintenance_secy_vindhyachal_id"
                  }
          },
          "welfare_complaint":{
                  "director":"director_id",
                  "dosa":"dosa_id",
                  "president_sac":"president_sac_id",
                  "sac_gensec":"sac_gensec_id",
                  "bsw_gensec":"bsw_gensec_id"
          },
          "infrastructure_complaint":{
                  "director":"director_id",
                  "dosa":"dosa_id",
                  "president_sac":"president_sac_id",
                  "sac_gensec":"sac_gensec_id",
                  "bhm_gensec":"bhm_gensec_id"
          },
          "course_complaint":{
                  "cop290":{
                        "director":"director_id",
                        "doa":"doa_id",
                        "hod":"hod_cse_id",
                        "course_coordinator":"course_coordinator_cop290_id"
                  },
                  "col202":{
                        "director":"director_id",
                        "doa":"doa_id",
                        "hod":"hod_cse_id",
                        "course_coordinator":"course_coordinator_col202_id"
                  },
                  "ell231":{
                        "director":"director_id",
                        "doa":"doa_id",
                        "hod":"hod_ee_id",
                        "course_coordinator":"course_coordinator_ell231_id"
                  }
          },
          "nnn_complaint":{
            "nso":{
                  "director":"director_id",
                  "doa":"doa_id",
                  "president_nso":"president_nso_id",
                  "gensec_nso":"gensec_nso_id"
            },
            "ncc":{
                  "director":"director_id",
                  "doa":"doa_id",
                  "president_ncc":"president_ncc_id",
                  "gensec_ncc":"gensec_ncc_id"
            },
            "nss":{
                  "director":"director_id",
                  "doa":"doa_id",
                  "president_nss":"president_nss_id",
                  "gensec_nss":"gensec_nss_id"
            }
          },
          "security_complaint":{
                  "director":"director_id",
                  "security_officer":"security_officer_id"
          }
};

var input_users = [
//MESS COMPLAINT
{"unique_id":"cs5140297","name":"Vaibhav Bhagee","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"cse","contact_info":"9999988888","tags":["vindhyachal","nss"],"course_list":["cop290","col226"],"complaint_list":[]}
,
{"unique_id":"director_id","name":"Director","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"cse","contact_info":"9999988889","tags":[],"course_list":[],"complaint_list":[]}
,
{"unique_id":"dosa_id","name":"Dosa","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"ee","contact_info":"9999988890","tags":[],"course_list":[],"complaint_list":[]}
,
{"unique_id":"asso_dean_hm_id","name":"Asso Dean HM","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"ee","contact_info":"9999988891","tags":[],"course_list":[],"complaint_list":[]}
,
{"unique_id":"warden_kumaon_id","name":"Dosa","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"ee","contact_info":"9999988892","tags":[],"course_list":[],"complaint_list":[]}
,
{"unique_id":"house_secy_kumaon_id","name":"House Secy Kumaon","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"ee","contact_info":"9999988893","tags":["kumaon","nss"],"course_list":["ell231"],"complaint_list":[]}
 ,   //Kumaon
{"unique_id":"mess_secy_kumaon_id","name":"Mess Secy Kumaon","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"ee","contact_info":"9999988894","tags":["kumaon","nso"],"course_list":["cop290"],"complaint_list":[]}
,    //Vindy
{"unique_id":"mess_secy_vindhyachal_id","name":"Mess Secy Vindhyachal","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"cse","contact_info":"9999988895","tags":["vindhyachal","nso"],"course_list":["cop290"],"complaint_list":[]}
//MAINTENANCE COMPLAINT
,    //Kumaon
{"unique_id":"maintenance_secy_kumaon_id","name":"Maintenance Secy Kumaon","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"cse","contact_info":"9999988896","tags":["kumaon","ncc"],"course_list":["cop290","col202"],"complaint_list":[]}
,    //Vindy
{"unique_id":"maintenance_secy_vindhyachal_id","name":"Maintenance Secy Vindhyachal","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"cse","contact_info":"9999988897","tags":["vindhyachal","nss"],"course_list":["cop290","ell231"],"complaint_list":[]}
,//WELFARE COMPLAINT
{"unique_id":"president_sac_id","name":"President SAC","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"cse","contact_info":"9999988898","tags":[],"course_list":[],"complaint_list":[]}
,
{"unique_id":"sac_gensec_id","name":"SAC GenSec","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"ee","contact_info":"9999988899","tags":["kumaon","nso"],"course_list":["cop290"],"complaint_list":[]}
,
{"unique_id":"bsw_gensec_id","name":"BSW GenSec","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"ee","contact_info":"9999988900","tags":["vindhyachal","ncc"],"course_list":["ell231"],"complaint_list":[]}
,//INFRASTRUCTURE COMPLAINT
{"unique_id":"bhm_gensec_id","name":"BHM GenSec","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"ee","contact_info":"9999988901","tags":["vindhyachal","nss"],"course_list":["col202"],"complaint_list":[]}
,//COURSE COMPLAINT
{"unique_id":"doa_id","name":"Doa","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"ee","contact_info":"9999988902","tags":[],"course_list":[],"complaint_list":[]}
,//CSE
{"unique_id":"hod_cse_id","name":"HOD CSE","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"cse","contact_info":"9999988903","tags":[],"course_list":[],"complaint_list":[]}
,
{"unique_id":"course_coordinator_cop290_id","name":"Course Coordinator COP 290","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"cse","contact_info":"9999988904","tags":[],"course_list":["cop290"],"complaint_list":[]}
,
{"unique_id":"course_coordinator_col202_id","name":"Course Coordinator COL 202","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"cse","contact_info":"9999988905","tags":[],"course_list":["col202"],"complaint_list":[]}
,//EE
{"unique_id":"hod_ee_id","name":"HOD EE","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"ee","contact_info":"9999988906","tags":[],"course_list":[],"complaint_list":[]}
,
{"unique_id":"course_coordinator_ell231_id","name":"Course Coordinator ELL 231","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"ee","contact_info":"9999988907","tags":[],"course_list":["ell231"],"complaint_list":[]}
,//NSO
{"unique_id":"president_nso_id","name":"President NSO","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"ee","contact_info":"9999988908","tags":[],"course_list":[],"complaint_list":[]}
,
{"unique_id":"gensec_nso_id","name":"GenSec NSO","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"ee","contact_info":"9999988909","tags":["kumaon","nso"],"course_list":["cop290"],"complaint_list":[]}
,//NSS
{"unique_id":"president_nss_id","name":"President NSS","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"ee","contact_info":"9999988910","tags":[],"course_list":[],"complaint_list":[]}
,
{"unique_id":"gensec_nss_id","name":"GenSec NSS","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"ee","contact_info":"9999988909","tags":["kumaon","nss"],"course_list":["cop290"],"complaint_list":[]}
,//NCC
{"unique_id":"president_ncc_id","name":"President NCC","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"ee","contact_info":"9999988911","tags":[],"course_list":[],"complaint_list":[]}
,
{"unique_id":"gensec_ncc_id","name":"GenSec NCC","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"ee","contact_info":"9999988912","tags":["vindhyachal","ncc"],"course_list":["col202"],"complaint_list":[]}
,//SECURITY
{"unique_id":"security_officer_id","name":"Security Officer","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"cse","contact_info":"9999988913","tags":[],"course_list":[],"complaint_list":[]}
,
//ADMIN
{"unique_id":"admin1","name":"Admin Bhagee 1","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"cse","contact_info":"9999988887","tags":["vindhyachal","ncc"],"course_list":[],"complaint_list":[]}
,
{"unique_id":"admin2","name":"Admin Bhagee 2","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"cse","contact_info":"9999988886","tags":["vindhyachal","nso"],"course_list":[],"complaint_list":[]}
]

var special_users_input = [
//ADMIN
{"unique_id":"admin1","name":"Admin Bhagee 1","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"cse","contact_info":"9999988887","tags":["vindhyachal","ncc"],"course_list":[],"complaint_list":[]}
,
{"unique_id":"admin2","name":"Admin Bhagee 2","password":"a9993e364706816aba3e25717850c26c9cd0d89d","department":"cse","contact_info":"9999988886","tags":["vindhyachal","nso"],"course_list":[],"complaint_list":[]}

]

var port = process.env.PORT || 8081;

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.use(express.static(__dirname+'/public'))

app.set('superSecret',secret); //Set the secret variable

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})

var apiRoutes = express.Router();

var uri = "mongodb://mybookdb:PbqLuRAb6koAl5MKdEcQkft1aLlDD7DFFPCoMkT2I9OfMXde4Ou1YXwp2nrZz2RzvH3L3oC6Ph6e5oddCBVgOg==@mybookdb.documents.azure.com:10255/?ssl=true";
// var uri = "mongodb://complaintsystem:complaintsystem@ds025449.mlab.com:25449/complaint_system";
// var uri = 'mongodb://127.0.0.1/complaint_system';

mongo.connect(uri, function(err,db) {
	if(err) res.send({success:false,message:"incorrect request"});

  // Collections in the database
  var users = db.collection("users");
  var special_users = db.collection("special_users");
  var complaints = db.collection("complaints");
  var notifications = db.collection("notifications");

  // API definitions

  app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
  });

  apiRoutes.get('/', function(req, res) {
    res.send({ message: 'Welcome to the Complaints Management System!' });
  });

  /**
  *  API to initialize the database with values
  */

  apiRoutes.get('/populate', function(req, res) {
    users.find().toArray(function(err,result)
    {
      if (err)
        res.send({success:false,message:"incorrect request"});

      else if (result.length == 0)
        users.insert(input_users,function(error,result1)
        {
          if (err)
            res.send({success:false,message:"incorrect request"});
          else
            res.send({success:true,message:"Successfully Populated"});
        });
      else
        res.send({success:false,message:"Database contains data which can be overwritten"});
    });
  });

  /**
  *  API to initialize the special users
  */

  apiRoutes.get('/populate_special', function(req, res) {
    special_users.find().toArray(function(err,result)
    {
      if (err)
        res.send({success:false,message:"incorrect request"});

      else if (result.length == 0)
        special_users.insert(special_users_input,function(error,result1)
        {
          if (err)
            res.send({success:false,message:"incorrect request"});
          else
            res.send({success:true,message:"Successfully Populated Special Users"});
        });
      else
        res.send({success:false,message:"Database contains data which can be overwritten"});
    });
  });

  /**
  *  API to empty user collection
  */

  apiRoutes.get('/empty_users', function(req, res) {
    users.remove({},function(err,result)
    {
      if (err)
        res.send({success:false,message:"incorrect request"});
      else
        res.send({success:true,message:"User Collection Emptied successfully"});
    });
  });

  /**
  *  API to empty special user collection
  */

  apiRoutes.get('/empty_special_users', function(req, res) {
    special_users.remove({},function(err,result)
    {
      if (err)
        res.send({success:false,message:"incorrect request"});
      else
        res.send({success:true,message:"Special User Collection Emptied successfully"});
    });
  });

  /**
  *  API to empty complaints collection
  */

  apiRoutes.get('/empty_complaints', function(req, res) {
    complaints.remove({},function(err,result)
    {
      if (err)
        res.send({success:false,message:"incorrect request"});
      else
        res.send({success:true,message:"Complaints Collection Emptied successfully"});
    });
  });

  /**
  *  API to empty notifications collection
  */

  apiRoutes.get('/empty_notifications', function(req, res) {
    notifications.remove({},function(err,result)
    {
      if (err)
        res.send({success:false,message:"incorrect request"});
      else
        res.send({success:true,message:"Notifications Collection Emptied successfully"});
    });
  });

  /**
  *  API for uploading images/text/videos etc
  */

  apiRoutes.post('/upload', function(req, res) {

  	// var fpath = "https://mybookblob.blob.core.windows.net/mybookcontainer/default_dp.png";
  	// var filePath = fpath;
  	var filePath = req.body.content;
  	console.log(filePath);
  	var blobName = crypto.createHash('sha1').update(filePath).digest('hex'); // Hash the string password to path
  	console.log(blobName);

  	blobSvc.createBlockBlobFromText(containerName, blobName, filePath, {
                         contentType: 'image/jpeg',
                         contentEncoding: 'base64'
                      }, function(error, result, response){
	  
	  // console.log(result);
	  console.log(response);
	  console.log(error);

	  if(!error){

	    var fileURL = blobUrl + containerName + '/' + blobName;

	    res.send({success: true, url: fileURL});
	  }
	  else {

	  	res.send({success: false, message: "incorrect request"});
	  }
	});
    
    // users.find({"unique_id":req.body.unique_id}).toArray(function(err,result)
    // {
    //   if (err)
    //     res.send({success:false,message:"incorrect request"});

    //   else if (result.length != 0)
    //     users.update({"unique_id":req.body.unique_id},{$set:{"unique_id":req.body.unique_id,"name":req.body.name,"password":password,"department":req.body.department,"contact_info":req.body.contact_info,"tags":req.body.tags,"course_list":req.body.course_list,"complaint_list":[]}},function(err,result1)
    //     {
    //       if (err)
    //         res.send({success:false,message:"incorrect request"});
    //       else
    //         res.send({success:true,message:"User Updated Successfully"});
    //     });    
    //   else
    //     res.send({success:false,message:"User Not Found"});
    // });
  });

  /**
  *  API for LOGIN authentication and Token generation for normal users
  */

  apiRoutes.post('/login',function(req,res)
  {
    var username = req.body.username;
    var password = crypto.createHash('sha1').update(req.body.password).digest('hex'); // Hash the string password to SHA-1

    users.find({"unique_id":username,"password":password}).toArray(function(err,result)
    {
      if (err)
        res.send({success:false,message:"incorrect request"});

      else if (result.length == 0)
        res.send({"success":false,"Message":"Incorrect Credentials"});
      else
      {
        var token = jwt.sign(result[0], app.get('superSecret'), {
          // expiresIn: 86400 // expires in 24 hours
        });

        // return the information including token as JSON
        res.send({
          success: true,
          token: token,
          unique_id: result[0].unique_id,
          name: result[0].name,
          department: result[0].department,
          contact_info: result[0].contact_info,
          tags: result[0].tags,
          course_list: result[0].course_list,
          complaint_list: result[0].complaint_list
        });
      }
    });

  });

  /**
  *  API for LOGIN authentication and Token generation for special users (src: https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)
  */

  apiRoutes.post('/special_login',function(req,res)
  {
    var username = req.body.username;
    var password = crypto.createHash('sha1').update(req.body.password).digest('hex'); // Hash the string password to SHA-1

    special_users.find({"unique_id":username,"password":password}).toArray(function(err,result)
    {
      if (err)
        res.send({success:false,message:"incorrect request"});

      else if (result.length == 0)
        res.send({"success":false,"Message":"Incorrect Credentials"});
      else
      {
        var token = jwt.sign(result[0], app.get('superSecret'), {
          // expiresInMinutes: 86400 // expires in 24 hours
        });

        // return the information including token as JSON
        res.send({
          success: true,
          token: token,
          unique_id: result[0].unique_id,
          name: result[0].name,
          department: result[0].department,
          contact_info: result[0].contact_info,
          tags: result[0].tags,
          course_list: result[0].course_list,
          complaint_list: result[0].complaint_list
        });
      }
    });

  });

  /**
  *  API to check and decode token
  */

  apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // // if there is no token
    // // return an error
    // return res.status(403).send({ 
    //     success: false, 
    //     message: 'No token provided.' 
    // });
    next();
    
  }
});

//Temporary API to get users
  apiRoutes.get('/users', function(req, res) {
    users.find().toArray(function(err,result)
    {
      if (err)
        res.send({success:false,message:"incorrect request"});

      else if (result.length == 0)
        res.send("Empty collection");
      else
        res.send(result);
    });
  });

//Temporary API to get special users
  apiRoutes.get('/special_users', function(req, res) {
    special_users.find().toArray(function(err,result)
    {
      if (err)
        res.send({success:false,message:"incorrect request"});

      else if (result.length == 0)
        res.send("Empty collection");
      else
        res.send(result);
    });
  });

//Temporary API to get all notifications
  apiRoutes.get('/all_notifications', function(req, res) {
    notifications.find().toArray(function(err,result)
    {
      if (err)
        res.send({success:false,message:"incorrect request"});

      else if (result.length == 0)
        res.send("Empty collection");
      else
        res.send(result);
    });
  });

//Temporary API to get complaints
  apiRoutes.get('/all_complaints', function(req, res) {
  	var receiver_name = req.decoded.name;

    complaints.find({"receiver_name":receiver_name}).toArray(function(err,result)
    {
      if (err)
        res.send({success:false,message:"incorrect request"});

      else if (result.length == 0)
        res.send("Empty collection");
      else
        res.send(result);
    });
  });

  /**
  *  API to get Details of a particular user
  */

  apiRoutes.post('/get_user_details',function(req,res)
  {
    var username = req.body.unique_id;

    users.find({"unique_id":username}).toArray(function(err,result)
    {
      if (err)
        res.send({success:false,message:"incorrect request"});

      else if (result.length == 0)
        res.send({"success":false,"Message":"User Not Found"});
      else
      {
        
        var complaint_list = result[0].complaint_list;
        // return the information including token as JSON
        (complaints.find({"complaint_id":{$in: complaint_list}}).toArray(function(err,result1)
        {
          if (err)
            res.send({success:false,message:"incorrect request"});
          else
            (notifications.find({"complaint_id":{$in: complaint_list}}).sort({tstamp: -1}).toArray(function(err,result2)
            {
              if (err)
                res.send({success:false,message:"incorrect request"});
              else
                res.send({success:true,
                  unique_id: result[0].unique_id,
                  name: result[0].name,
                  department: result[0].department,
                  contact_info: result[0].contact_info,
                  tags: result[0].tags,
                  course_list: result[0].course_list,
                  complaint_list: result[0].complaint_list,
                  complaint_details:result1,
                  notifications:result2});
            }));
        }));
      }
    });

  });


  /**
  *  API to add a user to the database
  */

  //TODO: Add checks for the request being made by a special user only

  apiRoutes.post('/add_user', function(req, res) {
    var password = crypto.createHash('sha1').update(req.body.password).digest('hex'); // Hash the string password to SHA-1
    
    users.find({"unique_id":req.body.unique_id}).toArray(function(err,result)
    {
      if (err)
        res.send({success:false,message:"incorrect request"});

      else if (result.length == 0)
        users.insert({"unique_id":req.body.unique_id,"name":req.body.name,"password":password,"department":req.body.department,"contact_info":req.body.contact_info,"tags":req.body.tags,"course_list":req.body.course_list,"complaint_list":[], "imgUrl":req.body.imgUrl},function(err,result1)
        {
          if (err)
            res.send({success:false,message:"incorrect request"});
          else
            res.send({success:true,message:"User Added Successfully"});
        });    
      else
        res.send({success:false,message:"User Already Exists"});
    });
  });

  /**
  *  API to delete a user from the database
  */

  apiRoutes.post('/delete_user', function(req, res) {
    
    users.find({"unique_id":req.body.unique_id}).toArray(function(err,result)
    {
      if (err)
        res.send({success:false,message:"incorrect request"});

      else if (result.length != 0)
        users.remove({"unique_id":req.body.unique_id},function(err,result1)
        {
          if (err)
            res.send({success:false,message:"incorrect request"});
          else
            res.send({success:true,message:"User Deleted Successfully"});
        });    
      else
        res.send({success:false,message:"User Not Found"});
    });
  });

  /**
  *  API to update the details of a user
  */

  apiRoutes.post('/update_user_details', function(req, res) {
    var password = crypto.createHash('sha1').update(req.body.password).digest('hex'); // Hash the string password to SHA-1
    
    users.find({"unique_id":req.body.unique_id}).toArray(function(err,result)
    {
      if (err)
        res.send({success:false,message:"incorrect request"});

      else if (result.length != 0)
        users.update({"unique_id":req.body.unique_id},{$set:{"unique_id":req.body.unique_id,"name":req.body.name,"password":password,"department":req.body.department,"contact_info":req.body.contact_info,"tags":req.body.tags,"course_list":req.body.course_list,"complaint_list":[], "imgUrl":req.body.imgUrl}},function(err,result1)
        {
          if (err)
            res.send({success:false,message:"incorrect request"});
          else
            res.send({success:true,message:"User Updated Successfully"});
        });    
      else
        res.send({success:false,message:"User Not Found"});
    });
  });

  /**
  *  API to get list of complaints of a user
  */

  // parameter passed in URL as /api/complaintlist?unique_id=<unique_id_of_the_user>

  apiRoutes.get('/complaintlist', function(req, res) {
    
    users.find({"unique_id":req.query.unique_id}).toArray(function(err,result)
    {
      if (err)
        res.send({success:false,message:"incorrect request"});

      else if (result.length == 0)
            res.send({success:false,message:"User Not found"});
      else
        res.send({success:true,complaint_list:result[0].complaint_list});
    });
  });

  /**
  *  API to get complaint details of a user
  */

  apiRoutes.post('/complaint_details', function(req, res) {

      var complaint_list = req.body.complaint_list.split(",");

      (complaints.find({"complaint_id":{$in: complaint_list}}).toArray(function(err,result)
      {
        if (err)
          res.send({success:false,message:"incorrect request"});
        else
          res.send({success:true,complaints:result});
      }));
  });

  /**
  *  API to get list of notifications
  */

  apiRoutes.post('/notifications', function(req, res) {

      var complaint_list = req.body.complaint_list.split(",");

      (notifications.find({"complaint_id":{$in: complaint_list}}).sort({tstamp: -1}).toArray(function(err,result)
      {
        if (err)
          res.send({success:false,message:"incorrect request"});
        else
          res.send({success:true,notifications:result});
      }));
  });

  /**
  *  API to post a new Thread to a complaint
  */

  apiRoutes.post('/new_thread', function(req, res) {

      (complaints.find({"complaint_id":req.body.complaint_id}).toArray(function(err,result) // Fetch the relavant complaint
      {
        if (err)
          res.send({success:false,message:"incorrect request"});

        else if (result.length == 0)
          res.send({success:false,message:"Incorrect complaint ID"});
        else
        {
          // Create the thread object
          var thread_obj = {
            thread_id:req.body.complaint_id+"_th"+result[0]["threads"].length,
            complaint_id:req.body.complaint_id,
            title:req.body.title,
            description:req.body.description,
            last_updated:(new Date()).toDateString(),
            comments:[]
          }

          result[0]["threads"].push(thread_obj);

          // Add the thread to the complaint
          (complaints.update({"complaint_id":req.body.complaint_id},{$set:{"threads":result[0]["threads"]}},function(err,result1)
          {
            if (err)
              res.send({success:false,message:"incorrect request"});
            else
            {
              var notif = {
                complaint_id:req.body.complaint_id,
                timestamp: (new Date()).toDateString(),
                tstamp:new Date(),
                content: req.decoded.name + " posted a new thread under complaint "+req.body.complaint_id
              }

              // Generate the required notification
              notifications.insert(notif,function(err,result2)
              {
                if (err)
                  res.send({success:false,message:"incorrect request"});
                else
                  res.send({success:true,message:"Thread Added Successfully",complaint:result[0],notification:notif});
              });    
            }
          }));          
        }
      }));
  });

  /**
  *  API to post a new Comment to a thread of a complaint
  */

  apiRoutes.post('/new_comment', function(req, res) {

      (complaints.find({"complaint_id":req.body.complaint_id}).toArray(function(err,result) // Fetch the required complaint
      {
        if (err)
          res.send({success:false,message:"incorrect request"});

        else if (result.length == 0)
          res.send({success:false,message:"Incorrect complaint ID"});
        else
        {
          var comment_obj = {
            posted_by:req.decoded.unique_id,
            description:req.body.description,
            timestamp:(new Date()).toDateString(),
          }

          for (var i = 0; i < result[0]["threads"].length; i++ )
          {
            if(result[0]["threads"][i]["thread_id"] === req.body.thread_id)
              result[0]["threads"][i]["comments"].push(comment_obj);
            // break;
          }

          (complaints.update({"complaint_id":req.body.complaint_id},{$set:{"threads":result[0]["threads"]}},function(err,result1)
          {
            if (err)
              res.send({success:false,message:"incorrect request"});
            else
            {
              var notif = {
                complaint_id:req.body.complaint_id,
                timestamp: (new Date()).toDateString(),
                tstamp:new Date(),
                content: req.decoded.name + " posted a new comment on the thread "+req.body.thread_id+" under complaint "+req.body.complaint_id
              }

              notifications.insert(notif,function(err,result2)
              {
                if (err)
                  res.send({success:false,message:"incorrect request"});
                else
                  res.send({success:true,message:"Comment Added Successfully",complaint:result[0],notification:notif});
              });    
            }
          }));          
        }
      }));
  });

  /**
  *  API to mark a complaint as resolved
  */

  apiRoutes.post('/mark_resolved', function(req, res) {

      (complaints.find({"complaint_id":req.body.complaint_id}).toArray(function(err,result) // Fetch the required complaint
      {
        if (err)
          res.send({success:false,message:"incorrect request"});

        else if (result.length == 0)
          res.send({success:false,message:"Incorrect complaint ID"});
        else
        {
          var status = "unresolved";

          if (result[0]["lodged_by"] === req.decoded.unique_id)
            status = "resolved";
          else if (result[0]["current_level"] === req.decoded.unique_id)
          {  
            status = "under_resolution";
            if (result[0]["current_level_index"] === 0)
              status = "resolved";
          }

          result[0]["current_status"] = status;

          (complaints.update({"complaint_id":req.body.complaint_id},{$set:{"current_status":status}},function(err,result1)
          {
            if (err)
              res.send({success:false,message:"incorrect request"});
            else
            {
              var notif = {
                complaint_id:req.body.complaint_id,
                timestamp: (new Date()).toDateString(),
                tstamp:new Date(),
                content: req.decoded.name + " marked the complaint "+req.body.complaint_id+" as "+status
              }

              notifications.insert(notif,function(err,result2)
              {
                if (err)
                  res.send({success:false,message:"incorrect request"});
                else
                  res.send({success:true,message:"Complaint Status Changed Successfully",complaint:result[0],notification:notif});
              });    
            }
          }));          
        }
      }));
  });

  /**
   * API to delete a complaint from the collection
   */

  apiRoutes.post('/delete_complaint', function(req, res) {

      (complaints.remove({"post_id":req.body.post_id},function(err,result) // Fetch the required complaint
      {
        if (err)
          res.send({success:false,message:"incorrect request"});

        else if (result.length == 0)
          res.send({success:false,message:"Post not found"});
        else
        {
          res.send({success:true,message:"Post Deleted Successfully"});   
        }
      }));
  });

  /**
  *  API to relodge a complaint with the same authority
  */

  apiRoutes.post('/relodge_same_authority', function(req, res) {

      (complaints.find({"complaint_id":req.body.complaint_id}).toArray(function(err,result) // Fetch the required complaint
      {
        if (err)
          res.send({success:false,message:"incorrect request"});

        else if (result.length == 0)
          res.send({success:false,message:"Incorrect complaint ID"});
        else
        {
          var status = "unresolved";

          result[0]["current_status"] = status;

          (complaints.update({"complaint_id":req.body.complaint_id},{$set:{"current_status":status}},function(err,result1)
          {
            if (err)
              res.send({success:false,message:"incorrect request"});
            else
            {
              var notif = {
                complaint_id:req.body.complaint_id,
                timestamp: (new Date()).toDateString(),
                tstamp:new Date(),
                content: req.decoded.name + " relodged the complaint with "+result[0]["current_level"]
              }

              notifications.insert(notif,function(err,result2)
              {
                if (err)
                  res.send({success:false,message:"incorrect request"});
                else
                  res.send({success:true,message:"Complaint Relodged Successfully",complaint:result[0],notification:notif});
              });    
            }
          }));          
        }
      }));
  });

  /**
  *  API to vote
  */

  apiRoutes.post('/vote', function(req, res) {

      (complaints.find({"complaint_id":req.body.complaint_id}).toArray(function(err,result) // Fetch the required complaint
      {
        if (err)
          res.send({success:false,message:"incorrect request"});

        else if (result.length == 0)
          res.send({success:false,message:"Incorrect complaint ID"});
        else
        {
          var flag = false;
          for( var i = 0; i < result[0]["votes"]["voted"].length; i++)
          {
            if (result[0]["votes"]["voted"][i] === req.decoded.unique_id)
            {
              res.send({success:false,message:"Already Voted"});
              flag = true;
            }
          }
          
          if(!flag)
          {
            if (req.body.type === "upvote")
              result[0]["votes"]["upvotes"]+=1;
            else
              result[0]["votes"]["downvotes"]+=1;

            result[0]["votes"]["voted"].push(req.decoded.unique_id);

            (complaints.update({"complaint_id":req.body.complaint_id},{$set:result[0]},function(err,result1)
            {
              if (err)
                res.send({success:false,message:"incorrect request"});
              else
              {
                var notif = {
                  complaint_id:req.body.complaint_id,
                  timestamp: (new Date()).toDateString(),
                  tstamp:new Date(),
                  content: req.decoded.name + " "+req.body.type+"d the complaint "+req.body.complaint_id
                }

                notifications.insert(notif,function(err,result2)
                {
                  if (err)
                    res.send({success:false,message:"incorrect request"});

                    res.send({success:true,message:"Voted Successfully",complaint:result[0],notification:notif});
                });    
              }
            }));
          }          
        }
      }));
  });


  /**
  *  API to make a new complaint
  */

  apiRoutes.post('/new_complaint', function(req, res) {

    var hierarchy;

    var sender_id = req.decoded.unique_id;

    var sender_name = req.decoded.name;

	var receiver_name = req.body.to;

	var title = req.body.title;

	var description = req.body.description;

    var post_id = "p"+crypto.createHash('sha1').update((new Date())+"").digest('hex');

    var complaint = {
    			  post_id: post_id,
                  sender_id: sender_id,
                  sender_name: sender_name,
                  receiver_name: receiver_name,
                  title: title,
                  description: description
                }

    complaints.insert(complaint,function(err,result1){

      if (err)
        res.send({success:false,message:"incorrect request"});
      else
      {
      	res.send({success:true,
      			  post_id: post_id,
      			  sender_id: sender_id,
                  sender_name: sender_name,
                  receiver_name: receiver_name,
                  title: title,
                  description: description
              });
      }
    });
  });

  /**
  *  API to relodge a complaint with the next Higher authority
  */

  apiRoutes.post('/relodge_next_authority', function(req, res) {

      (complaints.find({"complaint_id":req.body.complaint_id}).toArray(function(err,result) // Fetch the required complaint
      {
        if (err)
          res.send({success:false,message:"incorrect request"});

        else if (result.length == 0)
          res.send({success:false,message:"Incorrect complaint ID"});
        else
        {
          var status = "unresolved";

          result[0]["current_status"] = status;

          if (result[0]["current_level_index"] === 0)
          {
            res.send({success:false,message:"Already at the highest level"})
          }
          else
          {
            var hierarchy = result[0]["authority_hierarchy"];
            result[0]["current_level"] = hierarchy[Object.keys(hierarchy)[result[0]["current_level_index"]-1]];            
            result[0]["current_level_index"] = result[0]["current_level_index"]-1;

          (complaints.update({"complaint_id":req.body.complaint_id},{$set:result[0]},function(err,result1)
          {
            if (err)
              res.send({success:false,message:"incorrect request"});
            else
            {
            var notif = {
              complaint_id:req.body.complaint_id,
              timestamp: (new Date()).toDateString(),
              tstamp:new Date(),
              content: req.decoded.name + " relodged the complaint with "+result[0]["current_level"]
            }

            notifications.insert(notif,function(err,result2)
            {
              if (err)
                res.send({success:false,message:"incorrect request"});
              else
                users.update({"unique_id":{$in: [result[0]["current_level"]]}},{ $addToSet: { complaint_list: req.body.complaint_id } },function(err,result2)
                {
                  if (err)
                    res.send({success:false,message:"incorrect request"});
                  else
                  res.send({success:true,message:"Complaint Relodged Successfully",complaint:result[0],notification:notif});
                });
            });    
          }
          })); 
          }         
        }
      }));
  });

  app.use('/api', apiRoutes);

});