'use strict';

/* global getParticipantRegistry emit */

/**
 * ServiceUpdate transaction
 * @param {org.realty.biznet.ServiceUpdate} service
 * @transaction 
 */

 async function ServiceUpdate(serviceReq) {
 	// fetch the service values for the project
 	serviceReq.project.service = serviceReq.service;
 	serviceReq.project.status = serviceReq.status;
 	serviceReq.project.agentName = serviceReq.agent.name
 	
 	// update the project registry
 	const projectRegistry = await getAssetRegistry('org.realty.biznet.Project');
 	await projectRegistry.update(serviceReq.project);
 }
