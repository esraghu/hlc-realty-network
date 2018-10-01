'use strict';

//get libraries
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path')

//create express web-app
const app = express();
const router = express.Router();

// get libraries here
const network = require('./network.js');
const validate = require('./validate.js');

//bootstrap application settings
app.use(express.static('./public'));
app.use('/scripts', express.static(path.join(__dirname, '/public/scripts')));
app.use(bodyParser.json());

//get home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

//get builder page
app.get('/registerBuilder', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/registerBuilder.html'));
});

//get agent page
app.get('/registerAgent', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/registerAgent.html'));
});

//get regulator page
app.get('/registerRegulator', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/registerRegulator.html'));
});

//get builder page
app.get('/builder', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/builder.html'));
});

//get agent page
app.get('/agent', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/agent.html'));
});

//post call to register builder on the network
app.post('/api/registerBuilder', (req, res) => {

  //declare variables to retrieve from request
  var email = req.body.email;
  var name = req.body.name;
  var cardId = req.body.cardId;

  //print variables
  console.log('Using param - email: ' + email + ' name: ' + name + ' cardId: ' + cardId);

  //validate builder registration fields
  validate.validateBuilderRegistration(email, name)
    .then((response) => {
      //return error if error in response
      if (response.error != null) {
        res.json({
          error: response.error
        });
        return;
      } else {
        //else register builder on the network
        network.registerBuilder(cardId, email, name)
          .then((response) => {
            //return error if error in response
            if (response.error != null) {
              res.json({
                error: response.error
              });
            } else {
              //else return success
              res.json({
                success: response
              });
            }
          });
      }
    });
});

//post call to register agent on the network
app.post('/api/registerAgent', (req, res) => {

  //declare variables to retrieve from request
  var email = req.body.email;
  var name = req.body.name;
  var service = req.body.service;

  //print variables
  console.log('Using param - email: ' + email + ' name: ' + name + ' cardId: ' + cardId);

  //validate agent registration fields
  validate.validateAgentRegistration(cardId, email, name, service)
    .then((response) => {
      //return error if error in response
      if (response.error != null) {
        res.json({
          error: response.error
        });
        return;
      } else {
        //else register builder on the network
        network.registerAgent(cardId, email, name, service)
          .then((response) => {
            //return error if error in response
            if (response.error != null) {
              res.json({
                error: response.error
              });
            } else {
              //else return success
              res.json({
                success: response
              });
            }
          });
      }
    });
});

// get call for the builder to sign-in and fetch their projects list
app.post('/api/builderData', (req, res) => {
  var builderEmail = req.body.email;
  var cardId = req.body.cardid;
  console.log(`request body is ${req.body} and email is ${builderEmail} and card-id is ${cardId}`);

  network.getBuilderData(cardId, builderEmail)
    .then((response) => {
      response.error != null
        ? res.json({ error: response.console.error })
        : res.json({ success: response });
    })

})

//post call to create project on the network
app.post('/api/createProject', (req, res) => {

  //declare variables to retrieve from request
  var projectId = req.body.projectId;
  var name = req.body.name;
  var builderEmail = req.body.email;

  //print variables
  console.log('Using param - project name: ' + name + ' projectId: ' + projectId + 'builderEmail' + builderEmail + ' cardId: ' + cardId);

  network.createProject(cardId, projectId, name, builderEmail)
    .then((response) => {
      //return error if error in response
      if (response.error != null) {
        res.json({ error: response.console.error});
      } else {
        res.json({ success: response });
      }
    })
});

// post call to initiate a service
app.post('/api/initiateService', (req, res) => {
	var cardId = req.body.cardid;
	var serviceType = req.body.serviceType;
	var serviceStatus = req.body.serviceStatus;
	var project = req.body.projectId;
	var agent = req.body.agentEmail;

	network.initiateService(cardid, serviceType, serviceStatus, project, agent)
		.then((response) => {
			if(response.error != null) {
				res.json({
					error: response.error
				});
			} else {
				res.json({
					success: response
				});
			}
		});
});

// post call to update a service
app.post('/api/udpateService', (req, res) => {
	var cardId = req.body.cardid;
	var serviceType = req.body.serviceType;
	var serviceStatus = req.body.serviceStatus;
	var project = req.body.projectId;
	var agent = req.body.agentEmail;

	network.updateService(cardid, serviceType, serviceStatus, project, agent)
		.then((response) => {
			if(response.error != null) {
				res.json({
					error: response.error
				});
			} else {
				res.json({
					success: response
				});
			}
		});
});

//declare port
var port = process.env.PORT || 8000;
if (process.env.VCAP_APPLICATION) {
  port = process.env.PORT;
}

//run app on port
app.listen(port, function() {
  console.log('app running on port: %d', port);
});