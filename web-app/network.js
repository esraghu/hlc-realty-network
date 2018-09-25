const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const { BusinessNetworkDefinition, CertificateUtil, IdCard } = require('composer-common');

// declare namespace
const namespace = 'org.reatly.biznet';

// in-memory card store for testing so cards are not persisted to the file system
const cardStore = require('composer-common').NetworkCardStoreManager.getCardStore( { type: 'composer-wallet-inmemory' } );

// admin connection to the blockchain, used to deploy business network
let adminConnection;

// business network connection for the tests to use
let businessNetworkConnection;

let businessNetworkName = 'reatly-network';
let factory;

/*
 * Import card for an identity
 * @param {String} cardName The card name to use for this identity
 * @param {Object} identity The identity details
 */
async function importCardForIdentity(cardName, identity) {

    //use admin connection
    adminConnection = new AdminConnection();
    businessNetworkName = 'realty-network';

    //declare metadata
    const metadata = {
        userName: identity.userID,
        version: 1,
        enrollmentSecret: identity.userSecret,
        businessNetwork: businessNetworkName
    };

    //get connectionProfile from json, create Idcard
    const connectionProfile = require('./local_connection.json');
    const card = new IdCard(metadata, connectionProfile);

    //import card
    await adminConnection.importCard(cardName, card);
  }


/**
  * Reconnect using a different identity
  * @param {String} cardName The identity to use
  */
async function useIdentity(cardName) {

    //disconnect existing connection
    await businessNetworkConnection.disconnect();

    //connect to network using cardName
    businessNetworkConnection = new BusinessNetworkConnection();
    await businessNetworkConnection.connect(cardName);
}

// export modules
module.exports = {

    /**
     * Create Builder and import card for identity
     * @param {String} cardId Import card for identity
     * @param {String} email
     * @param {String} name
     */
    registerBuilder: async (cardId, email, name) => {
        try {
            // connect as admin
            businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect('admin@realty-network');

            // get factory for the business network
            factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            // create builder
            const builder = factory.newResource(namespace, 'Builder', email);
            builder.email = email;
            builder.name = name;

            // add builder
            const participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace + '.Builder');
            await participantRegistry.add(builder);

            // issue identity
            const identity = await businessNetworkConnection.issueIdentity(namespace + '.Builder#' + email, cardId);

            // import card for identity
            await importCardForIdentity(cardId, identity);

            // disconnect
            await businessNetworkConnection.disconnect('admin@reatly-network');

            return true;
        }
        catch(err) {
            console.log(err);
            var error = {};
            error.error = err.message;
            return error;
        }
    },

    /**
     * Create Agent and import card for identity
     * @param {String} cardId Import card for identity
     * @param {String} email
     * @param {String} name
     * @param {String} service
     */
    registerAgent: async (cardId, email, name, service) => {
        try {
            // connect as admin
            businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect('admin@realty-network');

            // get factory for the business network
            factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            // create agent
            const agent = factory.newResource(namespace, 'Agent', email);
            agent.email = email;
            agent.name = name;
            agent.service = service;

            // add agent
            const participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace + '.Agent');
            await participantRegistry.add(agent);

            // issue identity
            const identity = await businessNetworkConnection.issueIdentity(namespace + '.Agent#' + email, cardId);

            // import card for identity
            await importCardForIdentity(cardId, identity);

            // disconnect
            await businessNetworkConnection.disconnect('admin@reatly-network');

            return true;
        }
        catch(err) {
            console.log(err);
            var error = {};
            error.error = err.message;
            return error;
        }
    },

    /**
     * Create Agent and import card for identity
     * @param {String} cardId Import card for identity
     * @param {String} email
     * @param {String} name
     * @param {String} service
     */
    createProject: async (cardId, id, name, builderEmail) => {
        try {
            // connect as admin
            businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect('admin@realty-network');

            // get factory for the business network
            factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            // create project
            const project = factory.newResource(namespace, 'Project', id);
            project.id = id;
            project.name = name;
            project.builder = factory.newRelationship(namespace, 'Builder', builderEmail);
            project.service = '';
            project.status = '';
            project.agentName = '';

            // add project to registry
            const assetRegistry = await businessNetworkConnection.getAssetRegistry(namespace + '.Project');
            await assetRegistry.add(agent);

            // disconnect
            await businessNetworkConnection.disconnect('admin@reatly-network');

            return true;
        }
        catch(err) {
            console.log(err);
            var error = {};
            error.error = err.message;
            return error;
        }
    },

    /**
     * Initiate service request
     * @param {String} cardId Import card for identity
     * @param {String} serviceType
     * @param {String} status
     * @param {String} projectId
     * @param {String} agentEmail
     */
    initiateService: async (cardId, serviceType, status, projectId, agentEmail) => {
      try {
        //connect to network with cardId
        businessNetworkConnection = new BusinessNetworkConnection();
        await businessNetworkConnection.connect(cardId);

        //get the factory for the business network.
        factory = businessNetworkConnection.getBusinessNetwork().getFactory();

        //create transaction
        const serviceReq = factory.newTransaction(namespace, 'ServiceUpdate');
        serviceReq.service = serviceType;
        serviceReq.status = status;
        serviceReq.project = factory.newRelationship(namespace, 'Project', projectId);
        serviceReq.agent = factory.newRelationship(namespace, 'Agent', agentEmail);

        //submit transaction
        await businessNetworkConnection.submitTransaction(serviceReq);

        //disconnect
        await businessNetworkConnection.disconnect(cardId);
        return true;

      } catch (err) {
        console.log(err);
        var error = {};
        error.error = err.message;
        return error;
      }
    }


}
