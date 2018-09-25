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
const network = require('./network');

//bootstrap application settings
app.use(express.static('./public'));
app.use('/scripts', express.static(path.join(__dirname, '/public/scripts')));
app.use(bodyParser.json());

//get home page
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

  //print variables
  console.log('Using param - email: ' + email + ' name: ' + name + ' cardId: ' + cardId);

  //validate builder registration fields
  validate.validateBuilderRegistration(cardId, email, name)
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
